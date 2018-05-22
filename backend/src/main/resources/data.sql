
-- sample account (admin)
INSERT INTO `account` (`id`, `activation_key`, `active`, `admin`, `mail`, `password`, `salt`, `username`, `verified`) VALUES
(1, '92549257615158256383', b'1', b'1', 'kevin.kirn@students.fhwn.ch', '$argon2i$v=19$m=65536,t=20,p=4$mfYfUobRiPYPkYeQ5V3rtw$qHeBhHdtABi079RWeg9nzLRNw+lCgW4YBDgA30zfCqs', 'PhuSu1sPJQyjGvdSC02V', 'kevin.kirn', b'1');
INSERT INTO `account` (`id`, `activation_key`, `active`, `admin`, `mail`, `password`, `salt`, `username`, `verified`) VALUES
(2, '26332059566311682503', b'1', b'0', 'hoang.tran@students.fhnw.ch', '$argon2i$v=19$m=65536,t=20,p=4$PX7nChK0322TB4WJs6zhoQ$WAk3fm3kHkYFRn7y0ULpXtPCfDx8g3Hwa8eahiBN/aU', '6RGED5TfhosiuzMf48cJ', 'hoang.tran', b'1');
INSERT INTO `account` (`id`, `activation_key`, `active`, `admin`, `mail`, `password`, `salt`, `username`, `verified`) VALUES
(3, '72188799974221991623', b'1', b'0', 'kevin.kirn@hotmail.com', '$argon2i$v=19$m=65536,t=20,p=4$88Kqx0p3Hh8W12/qU7QT1g$kOasFpO5M+HAZIWFT898GW3JakcaBCgNtTxxHMKVC/I', 'JyrZPcMTo0RFX78RCInL', 'ihkawiss', b'1');
-- official game phases
delete from phase; commit;
insert into phase (id, name) values (1, 'Gruppenspiele');
insert into phase (id, name) values (2, 'Achtelfinale');
insert into phase (id, name) values (3, 'Viertelfinale');
insert into phase (id, name) values (4, 'Halbfinale');
insert into phase (id, name) values (5, 'Spiel um Platz drei');
insert into phase (id, name) values (6, 'Finale');

-- groups
delete from tournament_group; commit;
insert into tournament_group (id, name) values (1, 'A');
insert into tournament_group (id, name) values (2, 'B');
insert into tournament_group (id, name) values (3, 'C');
insert into tournament_group (id, name) values (4, 'D');
insert into tournament_group (id, name) values (5, 'E');
insert into tournament_group (id, name) values (6, 'F');
insert into tournament_group (id, name) values (7, 'G');
insert into tournament_group (id, name) values (8, 'H');
insert into tournament_group (id, name) values (100, 'dummy group');

-- teams
delete from team; commit;
insert into team (id, name, country_fifa_code, group_id) values (1, 'Russland', 'RUS', 1);
insert into team (id, name, country_fifa_code, group_id) values (2, 'Saudi-Arabien', 'KSA', 1);
insert into team (id, name, country_fifa_code, group_id) values (3, 'Ägypten', 'EGY', 1);
insert into team (id, name, country_fifa_code, group_id) values (4, 'Uruguay', 'URU', 1);
insert into team (id, name, country_fifa_code, group_id) values (5, 'Portugal', 'POR', 2);
insert into team (id, name, country_fifa_code, group_id) values (6, 'Spanien', 'ESP', 2);
insert into team (id, name, country_fifa_code, group_id) values (7, 'Marokko', 'MAR', 2);
insert into team (id, name, country_fifa_code, group_id) values (8, 'Iran', 'IRN', 2);
insert into team (id, name, country_fifa_code, group_id) values (9, 'Frankreich', 'FRA', 3);
insert into team (id, name, country_fifa_code, group_id) values (10, 'Australien', 'AUS', 3);
insert into team (id, name, country_fifa_code, group_id) values (11, 'Peru', 'PER', 3);
insert into team (id, name, country_fifa_code, group_id) values (12, 'Dänemark', 'DEN', 3);
insert into team (id, name, country_fifa_code, group_id) values (13, 'Argentinien', 'ARG', 4);
insert into team (id, name, country_fifa_code, group_id) values (14, 'Island', 'ISL', 4);
insert into team (id, name, country_fifa_code, group_id) values (15, 'Kroatien', 'CRO', 4);
insert into team (id, name, country_fifa_code, group_id) values (16, 'Nigeria', 'NGA', 4);
insert into team (id, name, country_fifa_code, group_id) values (17, 'Brasilien', 'BRA', 5);
insert into team (id, name, country_fifa_code, group_id) values (18, 'Schweiz', 'SUI', 5);
insert into team (id, name, country_fifa_code, group_id) values (19, 'Costa Rica', 'CRC', 5);
insert into team (id, name, country_fifa_code, group_id) values (20, 'Serbien', 'SRB', 5);
insert into team (id, name, country_fifa_code, group_id) values (21, 'Deutschland', 'GER', 6);
insert into team (id, name, country_fifa_code, group_id) values (22, 'Mexiko', 'MEX', 6);
insert into team (id, name, country_fifa_code, group_id) values (23, 'Schweden', 'SWE', 6);
insert into team (id, name, country_fifa_code, group_id) values (24, 'Südkorea', 'KOR', 6);
insert into team (id, name, country_fifa_code, group_id) values (25, 'Belgien', 'BEL', 7);
insert into team (id, name, country_fifa_code, group_id) values (26, 'Panama', 'PAN', 7);
insert into team (id, name, country_fifa_code, group_id) values (27, 'Tunesien', 'TUN', 7);
insert into team (id, name, country_fifa_code, group_id) values (28, 'England', 'ENG', 7);
insert into team (id, name, country_fifa_code, group_id) values (29, 'Polen', 'POL', 8);
insert into team (id, name, country_fifa_code, group_id) values (30, 'Senegal', 'SEN', 8);
insert into team (id, name, country_fifa_code, group_id) values (31, 'Kolumbien', 'COL', 8);
insert into team (id, name, country_fifa_code, group_id) values (32, 'Japan', 'JPN', 8);

-- dummy teams achtelfinale
insert into team (id, name, country_fifa_code, group_id) values (101, '1A', '', 100);
insert into team (id, name, country_fifa_code, group_id) values (102, '1B', '', 100);
insert into team (id, name, country_fifa_code, group_id) values (103, '1C', '', 100);
insert into team (id, name, country_fifa_code, group_id) values (104, '1D', '', 100);
insert into team (id, name, country_fifa_code, group_id) values (105, '1E', '', 100);
insert into team (id, name, country_fifa_code, group_id) values (106, '1F', '', 100);
insert into team (id, name, country_fifa_code, group_id) values (107, '1G', '', 100);
insert into team (id, name, country_fifa_code, group_id) values (108, '1H', '', 100);
insert into team (id, name, country_fifa_code, group_id) values (109, '2A', '', 100);
insert into team (id, name, country_fifa_code, group_id) values (110, '2B', '', 100);
insert into team (id, name, country_fifa_code, group_id) values (111, '2C', '', 100);
insert into team (id, name, country_fifa_code, group_id) values (112, '2D', '', 100);
insert into team (id, name, country_fifa_code, group_id) values (113, '2E', '', 100);
insert into team (id, name, country_fifa_code, group_id) values (114, '2F', '', 100);
insert into team (id, name, country_fifa_code, group_id) values (115, '2G', '', 100);
insert into team (id, name, country_fifa_code, group_id) values (116, '2H', '', 100);

-- dummy teams viertelfinale
insert into team (id, name, country_fifa_code, group_id) values (201, 'W49', '', 100);
insert into team (id, name, country_fifa_code, group_id) values (202, 'W50', '', 100);
insert into team (id, name, country_fifa_code, group_id) values (203, 'W51', '', 100);
insert into team (id, name, country_fifa_code, group_id) values (204, 'W52', '', 100);
insert into team (id, name, country_fifa_code, group_id) values (205, 'W53', '', 100);
insert into team (id, name, country_fifa_code, group_id) values (206, 'W54', '', 100);
insert into team (id, name, country_fifa_code, group_id) values (207, 'W55', '', 100);
insert into team (id, name, country_fifa_code, group_id) values (208, 'W56', '', 100);

-- dummy teams halbfinale
insert into team (id, name, country_fifa_code, group_id) values (301, 'W57', '', 100);
insert into team (id, name, country_fifa_code, group_id) values (302, 'W58', '', 100);
insert into team (id, name, country_fifa_code, group_id) values (303, 'W59', '', 100);
insert into team (id, name, country_fifa_code, group_id) values (304, 'W60', '', 100);

-- dummy teams 3. platz
insert into team (id, name, country_fifa_code, group_id) values (401, 'L61', '', 100);
insert into team (id, name, country_fifa_code, group_id) values (402, 'L62', '', 100);

-- dummy teams finale
insert into team (id, name, country_fifa_code, group_id) values (501, 'W61', '', 100);
insert into team (id, name, country_fifa_code, group_id) values (502, 'W62', '', 100);

-- locations
insert into stadium (id, city, name) values (1, 'Jekaterinburg', 'Jekaterinburg-Arena');
insert into stadium (id, city, name) values (2, 'Kaliningrad', 'Kaliningrad-Stadion');
insert into stadium (id, city, name) values (3, 'Kasan', 'Kasan-Arena');
insert into stadium (id, city, name) values (4, 'Moskau', 'Luschniki-Stadion');
insert into stadium (id, city, name) values (5, 'Moskau', 'Spartak-Stadion');
insert into stadium (id, city, name) values (6, 'Nischni Nowgorod', 'Nischni-Nowgorod-Stadion');
insert into stadium (id, city, name) values (7, 'Rostow am Don', 'Rostow-Arena');
insert into stadium (id, city, name) values (8, 'Sankt Petersburg', 'Sankt-Petersburg-Stadion');
insert into stadium (id, city, name) values (9, 'Samara', 'Samara-Arena');
insert into stadium (id, city, name) values (10, 'Saransk', 'Mordwinien-Arena');
insert into stadium (id, city, name) values (11, 'Sotschi', 'Fischt-Stadion');
insert into stadium (id, city, name) values (12, 'Wolgograd', 'Wolgograd-Arena');

-- gruppenspiele
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id, results_entered) values (1, '2018-06-14 18:00:00', 0, 0, 1, 2, 1, 4, 0);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id, results_entered) values (2, '2018-06-15 17:00:00', 0, 0, 3, 4, 1, 1, 0);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id, results_entered) values (3, '2018-06-15 18:00:00', 0, 0, 7, 8, 1, 8, 0);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id, results_entered) values (4, '2018-06-15 18:00:00', 0, 0, 5, 6, 1, 11, 0);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id, results_entered) values (5, '2018-06-16 21:00:00', 0, 0, 15, 16, 1, 2, 0);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id, results_entered) values (6, '2018-06-16 13:00:00', 0, 0, 9, 10, 1, 3, 0);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id, results_entered) values (7, '2018-06-16 16:00:00', 0, 0, 13, 14, 1, 5, 0);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id, results_entered) values (8, '2018-06-16 19:00:00', 0, 0, 11, 12, 1, 10, 0);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id, results_entered) values (9, '2018-06-17 18:00:00', 0, 0, 21, 22, 1, 4, 0);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id, results_entered) values (10, '2018-06-17 21:00:00', 0, 0, 17, 18, 1, 7, 0);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id, results_entered) values (11, '2018-06-17 16:00:00', 0, 0, 19, 20, 1, 9, 0);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id, results_entered) values (12, '2018-06-18 15:00:00', 0, 0, 23, 24, 1, 6, 0);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id, results_entered) values (13, '2018-06-18 19:00:00', 0, 0, 25, 26, 1, 11, 0);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id, results_entered) values (14, '2018-06-18 21:00:00', 0, 0, 27, 28, 1, 12, 0);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id, results_entered) values (15, '2018-06-19 18:00:00', 0, 0, 29, 30, 1, 5, 0);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id, results_entered) values (16, '2018-06-19 21:00:00', 0, 0, 1, 3, 1, 8, 0);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id, results_entered) values (17, '2018-06-19 15:00:00', 0, 0, 31, 32, 1, 10, 0);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id, results_entered) values (18, '2018-06-20 21:00:00', 0, 0, 8, 6, 1, 3, 0);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id, results_entered) values (19, '2018-06-20 15:00:00', 0, 0, 5, 7, 1, 4, 0);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id, results_entered) values (20, '2018-06-20 18:00:00', 0, 0, 4, 2, 1, 7, 0);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id, results_entered) values (21, '2018-06-21 20:00:00', 0, 0, 9, 11, 1, 1, 0);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id, results_entered) values (22, '2018-06-21 21:00:00', 0, 0, 13, 15, 1, 6, 0);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id, results_entered) values (23, '2018-06-21 16:00:00', 0, 0, 12, 10, 1, 9, 0);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id, results_entered) values (24, '2018-06-22 20:00:00', 0, 0, 20, 18, 1, 2, 0);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id, results_entered) values (25, '2018-06-22 15:00:00', 0, 0, 17, 19, 1, 8, 0);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id, results_entered) values (26, '2018-06-22 18:00:00', 0, 0, 16, 14, 1, 12, 0);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id, results_entered) values (27, '2018-06-23 15:00:00', 0, 0, 25, 27, 1, 5, 0);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id, results_entered) values (28, '2018-06-23 18:00:00', 0, 0, 24, 22, 1, 7, 0);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id, results_entered) values (29, '2018-06-23 21:00:00', 0, 0, 21, 23, 1, 11, 0);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id, results_entered) values (30, '2018-06-24 20:00:00', 0, 0, 32, 30, 1, 1, 0);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id, results_entered) values (31, '2018-06-24 21:00:00', 0, 0, 29, 31, 1, 3, 0);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id, results_entered) values (32, '2018-06-24 15:00:00', 0, 0, 28, 26, 1, 6, 0);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id, results_entered) values (33, '2018-06-25 20:00:00', 0, 0, 6, 7, 1, 2, 0);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id, results_entered) values (34, '2018-06-25 18:00:00', 0, 0, 4, 1, 1, 9, 0);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id, results_entered) values (35, '2018-06-25 21:00:00', 0, 0, 8, 5, 1, 10, 0);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id, results_entered) values (36, '2018-06-25 17:00:00', 0, 0, 2, 3, 1, 12, 0);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id, results_entered) values (37, '2018-06-26 17:00:00', 0, 0, 12, 9, 1, 4, 0);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id, results_entered) values (38, '2018-06-26 21:00:00', 0, 0, 14, 15, 1, 7, 0);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id, results_entered) values (39, '2018-06-26 21:00:00', 0, 0, 16, 13, 1, 8, 0);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id, results_entered) values (40, '2018-06-26 17:00:00', 0, 0, 10, 11, 1, 11, 0);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id, results_entered) values (41, '2018-06-27 19:00:00', 0, 0, 22, 23, 1, 1, 0);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id, results_entered) values (42, '2018-06-27 17:00:00', 0, 0, 24, 21, 1, 3, 0);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id, results_entered) values (43, '2018-06-27 21:00:00', 0, 0, 20, 17, 1, 5, 0);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id, results_entered) values (44, '2018-06-27 21:00:00', 0, 0, 18, 19, 1, 6, 0);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id, results_entered) values (45, '2018-06-28 20:00:00', 0, 0, 28, 25, 1, 2, 0);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id, results_entered) values (46, '2018-06-28 18:00:00', 0, 0, 30, 31, 1, 9, 0);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id, results_entered) values (47, '2018-06-28 21:00:00', 0, 0, 26, 27, 1, 10, 0);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id, results_entered) values (48, '2018-06-28 17:00:00', 0, 0, 32, 29, 1, 12, 0);

-- achtelfinale
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id, results_entered) values (49, '2018-06-30 17:00:00', 0, 0, 103, 112, 2, 3, 0);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id, results_entered) values (50, '2018-06-30 21:00:00', 0, 0, 101, 110, 2, 11, 0); 
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id, results_entered) values (51, '2018-07-01 17:00:00', 0, 0, 102, 109, 2, 4, 0); 
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id, results_entered) values (52, '2018-07-01 21:00:00', 0, 0, 104, 111, 2, 6, 0);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id, results_entered) values (53, '2018-07-02 18:00:00', 0, 0, 105, 114, 2, 9, 0); 
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id, results_entered) values (54, '2018-07-02 21:00:00', 0, 0, 107, 116, 2, 7, 0);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id, results_entered) values (55, '2018-07-03 17:00:00', 0, 0, 106, 113, 2, 8, 0);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id, results_entered) values (56, '2018-07-03 21:00:00', 0, 0, 108, 115, 2, 5, 0);

-- viertelfinale
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id, results_entered) values (57, '2018-07-06 17:00:00', 0, 0, 201, 202, 3, 6, 0);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id, results_entered) values (58, '2018-07-06 21:00:00', 0, 0, 205, 206, 3, 3, 0);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id, results_entered) values (59, '2018-07-07 18:00:00', 0, 0, 207, 208, 3, 9, 0);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id, results_entered) values (60, '2018-07-07 21:00:00', 0, 0, 203, 204, 3, 11, 0);

-- halbfinale
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id, results_entered) values (61, '2018-07-10 21:00:00', 0, 0, 301, 302, 4, 8, 0);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id, results_entered) values (62, '2018-07-11 21:00:00', 0, 0, 303, 304, 4, 4, 0);

-- platz 3
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id, results_entered) values (63, '2018-07-14 17:00:00', 0, 0, 401, 402, 5, 8, 0);

-- finale
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id, results_entered) values (64, '2018-07-15 18:00:00', 0, 0, 501, 502, 6, 4, 0);

-- all user group
insert into betting_pool (id, name, owner_id, special) values (1, "Rangliste aller Tipper", 1, 1);