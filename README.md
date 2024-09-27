Le projet RADEEJ vise à gérer les demandes de stage et le suivi des stagiaires dans une organisation, facilitant ainsi le processus d'internat.

Fonctionnalités Principales:

Gestion des Utilisateurs:

Trois types d'utilisateurs : Administrateur, Modérateur, et Employé.
Les administrateurs peuvent consulter et supprimer les informations des stagiaires acceptés, mais ne peuvent pas créer ou modifier leurs comptes.
Les modérateurs et employés peuvent créer, modifier, et supprimer leurs comptes.
Gestion des Demandes:

Les modérateurs traitent les demandes de stage et ont la capacité de les approuver ou de les rejeter.
Les employés peuvent proposer des stagiaires et suivre l'état de leurs demandes.
Affichage et Filtrage:

Les utilisateurs peuvent filtrer et afficher les demandes selon différents critères, comme le statut de la demande (acceptée, en attente, etc.).
Les demandes peuvent être affichées sous forme de tableau, avec des colonnes pour le nom, le prénom, le statut de la demande, et des détails supplémentaires.
Authentification et Autorisation:

Mise en œuvre d'une authentification basée sur JWT pour sécuriser l'accès aux différentes fonctionnalités en fonction des rôles des utilisateurs.
Gestion des Fichiers:

Les fichiers liés aux demandes sont stockés et peuvent être consultés via des liens.
Technologies Utilisées:

Backend: Node.js, Express, MongoDB pour la gestion des données et la création d'API.
Frontend: React pour le développement de l'interface utilisateur, avec Redux pour la gestion d'état et React Router pour la navigation.
UI: Utilisation de Material-UI pour les composants d'interface.
Objectif Final: Faciliter la gestion des demandes de stage, optimiser le suivi des stagiaires, et fournir une interface intuitive pour tous les types d'utilisateurs au sein de l'organisation.
