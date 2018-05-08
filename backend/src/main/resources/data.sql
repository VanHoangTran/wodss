

-- official game phases
delete from phase; commit;
insert into phase (id, name) values (1, 'Gruppenspiele');
insert into phase (id, name) values (2, 'Achtelfinale');
insert into phase (id, name) values (3, 'Viertelfinale');
insert into phase (id, name) values (4, 'Halbfinale');
insert into phase (id, name) values (5, 'Spiel um Platz drei und Finale');

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

-- teams
delete from team; commit;
insert into team (id, name, country_fifa_code, group_id) values (1, 'Russland', 'RUS', 1);
insert into team (id, name, country_fifa_code, group_id) values (2, 'Saudiarabien', 'KSA', 1);
insert into team (id, name, country_fifa_code, group_id) values (3, 'Ägypten', 'EGY', 1);
insert into team (id, name, country_fifa_code, group_id) values (4, 'Uruguay', 'URU', 1);
insert into team (id, name, country_fifa_code, group_id) values (5, 'Portugal', 'POR', 2);
insert into team (id, name, country_fifa_code, group_id) values (6, 'Spanien', 'ESP', 2);
insert into team (id, name, country_fifa_code, group_id) values (7, 'Marokko', 'MAR', 2);
insert into team (id, name, country_fifa_code, group_id) values (8, 'IR Iran', 'IRN', 2);
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
insert into team (id, name, country_fifa_code, group_id) values (24, 'Republik Korea', 'KOR', 6);
insert into team (id, name, country_fifa_code, group_id) values (25, 'Belgien', 'BEL', 7);
insert into team (id, name, country_fifa_code, group_id) values (26, 'Panama', 'PAN', 7);
insert into team (id, name, country_fifa_code, group_id) values (27, 'Tunesien', 'TUN', 7);
insert into team (id, name, country_fifa_code, group_id) values (28, 'England', 'ENG', 7);
insert into team (id, name, country_fifa_code, group_id) values (29, 'Polen', 'POL', 8);
insert into team (id, name, country_fifa_code, group_id) values (30, 'Senegal', 'SEN', 8);
insert into team (id, name, country_fifa_code, group_id) values (31, 'Kolumbien', 'COL', 8);
insert into team (id, name, country_fifa_code, group_id) values (32, 'Japan', 'JPN', 8);

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

-- games
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id) values (1, '2018-06-14 18:00:00', 0, 0, 1, 2, 1, 4);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id) values (2, '2018-06-15 17:00:00', 0, 0, 3, 4, 1, 1);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id) values (3, '2018-06-15 18:00:00', 0, 0, 7, 8, 1, 8);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id) values (4, '2018-06-15 18:00:00', 0, 0, 5, 6, 1, 11);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id) values (5, '2018-06-16 21:00:00', 0, 0, 15, 16, 1, 2);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id) values (6, '2018-06-16 13:00:00', 0, 0, 9, 10, 1, 3);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id) values (7, '2018-06-16 16:00:00', 0, 0, 13, 14, 1, 5);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id) values (8, '2018-06-16 19:00:00', 0, 0, 11, 12, 1, 10);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id) values (9, '2018-06-17 18:00:00', 0, 0, 21, 22, 1, 4);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id) values (10, '2018-06-17 21:00:00', 0, 0, 17, 18, 1, 7);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id) values (11, '2018-06-17 16:00:00', 0, 0, 19, 20, 1, 9);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id) values (12, '2018-06-18 15:00:00', 0, 0, 23, 24, 1, 6);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id) values (13, '2018-06-18 19:00:00', 0, 0, 25, 26, 1, 11);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id) values (14, '2018-06-18 21:00:00', 0, 0, 27, 28, 1, 12);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id) values (15, '2018-06-19 18:00:00', 0, 0, 29, 30, 1, 5);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id) values (16, '2018-06-19 21:00:00', 0, 0, 1, 3, 1, 8);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id) values (17, '2018-06-19 15:00:00', 0, 0, 31, 32, 1, 10);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id) values (18, '2018-06-20 21:00:00', 0, 0, 8, 6, 1, 3);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id) values (19, '2018-06-20 15:00:00', 0, 0, 5, 7, 1, 4);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id) values (20, '2018-06-20 18:00:00', 0, 0, 4, 2, 1, 7);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id) values (21, '2018-06-21 20:00:00', 0, 0, 9, 11, 1, 1);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id) values (22, '2018-06-21 21:00:00', 0, 0, 13, 15, 1, 6);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id) values (23, '2018-06-21 16:00:00', 0, 0, 12, 10, 1, 9);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id) values (24, '2018-06-22 20:00:00', 0, 0, 20, 18, 1, 2);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id) values (25, '2018-06-22 15:00:00', 0, 0, 17, 19, 1, 8);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id) values (26, '2018-06-22 18:00:00', 0, 0, 16, 14, 1, 12);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id) values (27, '2018-06-23 15:00:00', 0, 0, 25, 27, 1, 5);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id) values (28, '2018-06-23 18:00:00', 0, 0, 24, 22, 1, 7);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id) values (29, '2018-06-23 21:00:00', 0, 0, 21, 23, 1, 11);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id) values (30, '2018-06-24 20:00:00', 0, 0, 32, 30, 1, 1);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id) values (31, '2018-06-24 21:00:00', 0, 0, 29, 31, 1, 3);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id) values (32, '2018-06-24 15:00:00', 0, 0, 28, 26, 1, 6);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id) values (33, '2018-06-25 20:00:00', 0, 0, 6, 7, 1, 2);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id) values (34, '2018-06-25 18:00:00', 0, 0, 4, 1, 1, 9);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id) values (35, '2018-06-25 21:00:00', 0, 0, 8, 5, 1, 10);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id) values (36, '2018-06-25 17:00:00', 0, 0, 2, 3, 1, 12);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id) values (37, '2018-06-26 17:00:00', 0, 0, 12, 9, 1, 4);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id) values (38, '2018-06-26 21:00:00', 0, 0, 14, 15, 1, 7);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id) values (39, '2018-06-26 21:00:00', 0, 0, 16, 13, 1, 8);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id) values (40, '2018-06-26 17:00:00', 0, 0, 10, 11, 1, 11);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id) values (41, '2018-06-27 19:00:00', 0, 0, 22, 23, 1, 1);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id) values (42, '2018-06-27 17:00:00', 0, 0, 24, 21, 1, 3);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id) values (43, '2018-06-27 21:00:00', 0, 0, 20, 17, 1, 5);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id) values (44, '2018-06-27 21:00:00', 0, 0, 18, 19, 1, 6);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id) values (45, '2018-06-28 20:00:00', 0, 0, 28, 25, 1, 2);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id) values (46, '2018-06-28 18:00:00', 0, 0, 30, 31, 1, 9);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id) values (47, '2018-06-28 21:00:00', 0, 0, 26, 27, 1, 10);
insert into game (id, date, away_goals, home_goals, home_id, away_id, phase_id, stadium_id) values (48, '2018-06-28 17:00:00', 0, 0, 32, 29, 1, 12);
