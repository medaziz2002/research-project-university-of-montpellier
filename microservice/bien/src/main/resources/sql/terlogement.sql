
INSERT INTO `type_biens` (`id`, `description`, `nom`, `image_id`) VALUES
    (1, 'Une villa est une maison individuelle spacieuse, souvent luxueuse, généralement située en dehors du centre-ville, avec un jardin, parfois une piscine, et conçue pour offrir confort et intimité.', 'Villa', NULL);
INSERT INTO `type_biens` (`id`, `description`, `nom`, `image_id`)
VALUES
    (52, 'Une maison est un bâtiment destiné à l''habitation, généralement occupé par une seule famille, et composé de plusieurs pièces comme le salon, la cuisine, les chambres et la salle de bain.\n\n\n\n\n\n', 'Maison', NULL),
    (53, 'Un studio est un petit appartement composé d''une seule pièce principale qui sert à la fois de salon, chambre à coucher et parfois de cuisine, avec une salle de bain séparée ou intégrée. Il est généralement conçu pour une personne ou un couple.', 'Studio', NULL);



INSERT INTO `proprietaires` (`id`, `id_user`) VALUES
    (_binary 0x47f8d450afbc46e398b338aefd8cef95, 152);
INSERT INTO `proprietaires` (`id`, `id_user`) VALUES
                                                  (_binary 0xafad2f901816449e8aa1d0f6886bb54e, 153),
                                                  (_binary 0xef0861d6bacc4fa7a5a8ea2977b124b4, 154);



INSERT INTO `annonces` (`id`, `code_postal`, `created_at`, `etat`, `gouvernorat`, `latitude`, `longitude`, `nbchambre`, `nblits`, `pays`, `prix_automne`, `prix_ete`, `prix_hiver`, `prix_printemps`, `rue`, `status`, `superficie`, `titre`, `ville`, `proprietaire_id`, `type_bien_id`)
VALUES
    (102, '8050', '2025-04-14 15:39:11.232000', 'accepté', 'Nabeul', 0, 0, 10, 20, 'Tunisie', 250, 350, 150, 200, 'Avenue des Nations Unies', 'visible', 800, 'Superbe villa spacieuse au calme absolu', 'Hammamet', UNHEX('47f8d450afbc46e398b338aefd8cef95'), 1),
    (103, '8025', '2025-04-14 15:41:02.078000', 'accepté', 'Nabeul', 0, 0, 3, 4, 'Tunisie', 80, 100, 60, 80, 'Rue de l''ONU', 'visible', 200, 'à louer s+3', 'Hammam El Ghezaz', UNHEX('47f8d450afbc46e398b338aefd8cef95'), 52),
    (104, '5020', '2025-04-14 15:42:40.804000', 'accepté', 'Monastir', 0, 0, 1, 2, 'Tunisie', 75, 90, 30, 80, 'Avenue Hédi Nouira', 'visible', 80, 'à louer studio', 'Jemmal', UNHEX('47f8d450afbc46e398b338aefd8cef95'), 53),
    (105, '8050', '2025-04-14 15:44:40.575000', 'accepté', 'Nabeul', 0, 0, 8, 16, 'Tunisie', 350, 400, 150, 350, 'Rue de la Corniche', 'visible', 890, 'Villa familiale avec grand espace', 'Hammamet', UNHEX('47f8d450afbc46e398b338aefd8cef95'), 1),
    (106, '8045', '2025-04-14 15:48:11.377000', 'accepté', 'Nabeul', 0, 0, 4, 4, 'Tunisie', 180, 180, 70, 180, 'Rue Ibn Khaldoun', 'visible', 150, 'à louer ', 'El Haouaria', UNHEX('afad2f901816449e8aa1d0f6886bb54e'), 52),
    (107, '4116', '2025-04-14 15:50:03.648000', 'accepté', 'Medenine', 0, 0, 1, 3, 'Tunisie', 180, 180, 45, 150, 'Rue des Jasmins', 'visible', 120, 'à louer s+1', 'Midoun', UNHEX('afad2f901816449e8aa1d0f6886bb54e'), 52);



INSERT INTO `locataires` (`id`, `id_user`) VALUES
	(_binary 0x8c67ecf033d2442faa247cf693cbefd2, 155);
INSERT INTO `locataires` (`id`, `id_user`) VALUES
	(_binary 0xf67ec3901e7347119f1ff48b67c93b19, 156);





