package ch.fhnw.wodss.tournament.service;

import java.io.IOException;
import java.net.URL;
import java.util.Date;
import java.util.Properties;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.google.common.base.Charsets;
import com.google.common.io.Resources;

import ch.fhnw.wodss.tournament.domain.Account;
import ch.fhnw.wodss.tournament.domain.AccountRecovery;
import ch.fhnw.wodss.tournament.util.LinkUtils;

/**
 * This service is responsible for sending any kind of mail notifications.
 * 
 * @author Kevin Kirn <kevin.kirn@students.fhnw.ch>
 */
@Service
public class MailService {

	private final Logger log = LoggerFactory.getLogger(MailService.class);

	/**
	 * Method to send registration mail
	 * 
	 * @param newAccount registered before
	 */
	public void sendRegistrationMail(Account newAccount) {
		log.info("building registration notification for {}", newAccount);

		try {
			// load mail template from resources
			URL url = getClass().getClassLoader().getResource("ch/fhnw/wodds/tournament/service/registration.html");
			String template = Resources.toString(url, Charsets.UTF_8);

			// replace username and set activation link
			String activationLink = LinkUtils.getActivationLink(newAccount);
			template = template.replace("{{username}}", newAccount.getUsername());
			template = template.replace("{{link}}", "<a href='" + activationLink + "'>" + activationLink + "</a>");

			sendMail(template, newAccount.getMail(), "Wilkommen beim Tippspiel!");

		} catch (IOException e) {
			log.error("could not load mail template", e);
		}

	}

	/**
	 * General method to send a eMail using google mail server.
	 * 
	 * @param message to send (text/html)
	 * @param recipient to send mail to
	 * @param subject of message
	 */
	private void sendMail(String message, String recipient, String subject) {
		log.info("sending a new mail to {}", recipient);

		// mail settings
		Properties properties = new Properties();
		properties.put("mail.smtp.auth", "true");
		properties.put("mail.smtp.starttls.enable", "true");
		properties.put("mail.smtp.host", "smtp.gmail.com");
		properties.put("mail.smtp.port", "587");

		// create user session
		Authenticator auth = new Authenticator() {
			public PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication("wodds.tippspiel@gmail.com", "wodds$2018");
			}
		};

		Session session = Session.getInstance(properties, auth);

		// create message
		Message msg = new MimeMessage(session);
		try {
			msg.setFrom(new InternetAddress("ihkawiss90@gmail.com"));
			InternetAddress[] toAddresses = { new InternetAddress(recipient) };
			msg.setRecipients(Message.RecipientType.TO, toAddresses);
			msg.setSubject(subject);
			msg.setSentDate(new Date());

			// set template as mail content
			msg.setContent(message, "text/html");

			// sends the e-mail
			Transport.send(msg);

			log.info("message successfully send to {}", recipient);

		} catch (AddressException e) {
			log.error("could not create InternetAddress for recipient", e);
		} catch (MessagingException e) {
			log.error("could not send mail", e);
		}
	}

	/**
	 * Method to send recovery mail
	 * 
	 * @param recovery created before
	 */
	public void sendRecoveryMail(AccountRecovery recovery) {
		log.info("building recovery mail for {}", recovery);

		try {
			// load mail template from resources
			URL url = getClass().getClassLoader().getResource("ch/fhnw/wodds/tournament/service/recovery.html");
			String template = Resources.toString(url, Charsets.UTF_8);

			// replace username and set activation link
			String recoveryLink = LinkUtils.getRecoveryLink(recovery);
			template = template.replace("{{username}}", recovery.getAccount().getUsername());
			template = template.replace("{{link}}", "<a href='" + recoveryLink + "'>" + recoveryLink + "</a>");

			sendMail(template, recovery.getAccount().getMail(), "Hilfe ist da!");

		} catch (IOException e) {
			log.error("could not load mail template", e);
		}
	}

}
