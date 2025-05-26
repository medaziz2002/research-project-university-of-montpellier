


INSERT INTO `motdepasses` (`id`, `date_creation`, `valeur_motdepasse`, `user_id`) VALUES

	(102, '2025-04-14 15:32:18.818000', '$2a$10$K8InT9avbEaj.szjEYqPYe1pY3SC0j8lza0F/kKatsQeQ7HoDeU5O', NULL),
	(103, '2025-04-14 15:33:15.462000', '$2a$10$uF31UbETcoXKf0Ipao5AR.W6WMuyHwWz3DZVtK30EuTBtBo5yIWLG', NULL),
	(104, '2025-04-14 15:34:00.965000', '$2a$10$Li5jYIN9Wp1CSJpbc3.uuecLLYJPNg1xHp9jhHwJ8DzC/3hjegGHK', NULL),
	(105, '2025-04-14 15:35:14.972000', '$2a$10$EMEHGIp81RXPh7D.AbB9sus9q8u5BAT1NkOCh5FlsQKBWQi0C7ClC', NULL),
	(106, '2025-04-14 15:36:01.444000', '$2a$10$0fAKdBjMwnsaEcoB5Sg63uOtiDsw/H3PhCazFDpdONaT9AsIZTRHq', NULL);


INSERT INTO `users` (`id`, `date_naissance`, `email`, `etat`, `locataire_id`, `nom`, `prenom`, `proprietaire_id`, `role`, `token_to_reset_password`, `image_id`, `motdepasse_id`) VALUES

	(152, '2025-04-15 00:00:00.000000', 'ahmed@gmail.com', 1, NULL, 'souissi', 'ahmed', _binary 0x47f8d450afbc46e398b338aefd8cef95, 'proprietaire', NULL, NULL, 102),
	(153, '2025-04-02 00:00:00.000000', 'nadine@gmail.com', 1, NULL, 'toumi', 'nadine', _binary 0xafad2f901816449e8aa1d0f6886bb54e, 'proprietaire', NULL, NULL, 103),
	(154, '2025-04-17 00:00:00.000000', 'maher@gmail.com', 1, NULL, 'triki', 'maher', _binary 0xef0861d6bacc4fa7a5a8ea2977b124b4, 'proprietaire', NULL, NULL, 104),
	(155, '2025-04-02 00:00:00.000000', 'rami@gmail.com', 1, _binary 0x8c67ecf033d2442faa247cf693cbefd2, 'belhaj', 'rami', NULL, 'locataire', NULL, NULL, 105),
	(156, '2025-04-03 00:00:00.000000', 'sami@gmail.com', 1, _binary 0xf67ec3901e7347119f1ff48b67c93b19, 'nina', 'sami', NULL, 'locataire', NULL, NULL, 106);


