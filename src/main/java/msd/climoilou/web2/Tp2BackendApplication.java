package msd.climoilou.web2;

import msd.climoilou.web2.Criteres.model.Critere;
import msd.climoilou.web2.Criteres.repository.CritereRepository;
import msd.climoilou.web2.Nouvelles.model.Nouvelle;
import msd.climoilou.web2.Nouvelles.repository.NouvelleRepository;
import msd.climoilou.web2.Utilisateurs.model.Utilisateur;
import msd.climoilou.web2.Utilisateurs.repository.UtilisateurRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.time.*;

@SpringBootApplication
public class Tp2BackendApplication implements CommandLineRunner {

    @Autowired
    private CritereRepository critereRepository;

    @Autowired
    private NouvelleRepository nouvelleRepository;

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    private Logger logger = LoggerFactory.getLogger(Tp2BackendApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(Tp2BackendApplication.class, args);
	}


    @Override
    public void run(String... args) throws Exception {
        logger.info("Tp2BackendApplication - run : Chargement des données initiales");

        createNouvelle();
        createUtilisateur();
        createCriteria();
    }

    private void createUtilisateur() {
        utilisateurRepository.save(new Utilisateur("ADMIN", "admin",
                LocalDateTime.of(2021, 2, 2, 0, 0),
                LocalDateTime.of(2003, 4, 4, 0, 0)));
        utilisateurRepository.save(new Utilisateur("JOURNALIST", "Journalista",
                LocalDateTime.of(2024, 6, 12, 0, 0),
                LocalDateTime.of(2002, 7, 7, 0, 0)));
        utilisateurRepository.save(new Utilisateur("JOURNALIST", "Journalistb",
                LocalDateTime.of(2023, 9, 17, 0, 0),
                LocalDateTime.of(2001, 10, 11, 0, 0)));
        utilisateurRepository.save(new Utilisateur("JOURNALIST", "Journalistc",
                LocalDateTime.of(2022, 11, 15, 0, 0),
                LocalDateTime.of(2000, 12, 19, 0, 0)));
    }

    private void createNouvelle() {
        nouvelleRepository.save(new Nouvelle("Annonce d’une extension crossover entre deux franchises majeures",
                "La firme Eclipse Games annonce une collaboration entre le TCG Mystica et le célèbre univers Shadowforge. L’extension, intitulée “Veils of Midnight”, introduira des cartes hybrides mélangeant les mécaniques de Mystica (mana astral, rituels de nuit) et les “forges d’ombre” de Shadowforge. Sortie prévue : printemps 2026.",
                "Cette extension mêlera les mécaniques du jeu Mystica (mana astral, rituels de nuit) avec celles de l’univers Shadowforge (forges d’ombre), proposant des cartes hybrides inédites. La sortie est prévue pour le printemps 2026.",
                LocalDateTime.of(2025, Month.SEPTEMBER, 12, 0, 0),
                "https://w7.pngwing.com/pngs/400/921/png-transparent-wizards-of-the-coast-hd-logo-thumbnail.png"));
        nouvelleRepository.save(new Nouvelle(
                "Tournoi mondial hybride (online + physique) pour la première fois",
                "Le circuit international de Dragon’s Crown TCG organisera son Championnat Mondial 2025 sous un format hybride : les phases qualificatives se feront en ligne, mais les finales auront lieu lors d’un événement physique à Tokyo. Les joueurs devront se soumettre à des contrôles stricts anti‑triche numérique.",
                "L’extension Mega Evolution Rebirth de Pokémon TCG, sortie le 26 septembre 2025 au Japon et prévue pour le 10 octobre 2025 en Europe, marque le grand retour des Méga-Évolutions après 8 ans d’absence.",
                LocalDateTime.of(2025, Month.AUGUST, 25, 0, 0),
                "https://w7.pngwing.com/pngs/400/921/png-transparent-wizards-of-the-coast-hd-logo-thumbnail.png"
        ));
        nouvelleRepository.save(new Nouvelle(
                "Révision importante de la liste des cartes bannies / limitées",
                "Après des mois de débats, le conseil compétitif de Arcane Realms publie une mise à jour majeure de sa liste interdite / limitée. Plusieurs cartes dominantes sont maintenant bannies afin de rééquilibrer les méta‑jeux, tandis que d’autres longtemps inutilisées reçoivent des réimpressions ou des buffs pour raviver l’intérêt.",
                "Disney Lorcana sera lancé à Singapour, Taïwan, et Hong Kong le 1er octobre 2025, avec des cartes en anglais. Une version localisée pourrait arriver en 2026.",
                LocalDateTime.of(2025, Month.AUGUST, 3, 0, 0),
                "https://w7.pngwing.com/pngs/400/921/png-transparent-wizards-of-the-coast-hd-logo-thumbnail.png"
        ));
        nouvelleRepository.save(new Nouvelle(
                "Version collector luxe avec cartes métalliques et vernis spécial",
                "Le TCG Starborne Legends lance une édition Collector « Galaxie Prisme » incluant des cartes métalliques holo‑gravées, un coffret à tirage limité, ainsi qu’un pack de cartes rares rétro‑inspirées des toutes premières éditions du jeu.",
                "Le studio WhiteForge lancera un nouveau format compétitif appelé « Conquest » pour Chronicles of Valor TCG, avec des règles spécifiques et zones de combat alternatives, testé en tournoi dès le 1er novembre 2025.",
                LocalDateTime.of(2025, Month.SEPTEMBER, 1, 0, 0),
                "https://w7.pngwing.com/pngs/400/921/png-transparent-wizards-of-the-coast-hd-logo-thumbnail.png"
        ));
        nouvelleRepository.save(new Nouvelle(
                "Nouveau mode de jeu : draft dynamique avec modifications en cours",
                "La prochaine extension de Elemental Tales introduira un mode “Draft Dynamique” : durant le draft, certaines cartes surprenantes pourront être activées ou influencées par des “événements monde” aléatoires, modifiant temporairement la puissance ou le coût de certaines cartes dans tous les decks.",
                "Riot Games lancera Riftbound: The League of Legends TCG le 20 octobre 2025 en Amérique du Nord et en Europe, avec un premier set appelé Origins comprenant 250 cartes, dont des versions foil exclusives.",
                LocalDateTime.of(2025, Month.JULY, 17, 0, 0),
                "https://w7.pngwing.com/pngs/400/921/png-transparent-wizards-of-the-coast-hd-logo-thumbnail.png"
        ));
        nouvelleRepository.save(new Nouvelle(
                "Application mobile companion avec réalité augmentée pour les cartes physiques",
                "Le studio derrière Mythic Ascendancy annonce le développement d’une appli companion mobile permettant, avec la réalité augmentée, de voir les cartes physiques s’animer, déclencher des effets spéciaux, ou lire automatiquement les textes de capacité via OCR.",
                "La nouvelle Forbidden & Limited List de Yu‑Gi‑Oh! TCG, avec plusieurs restrictions sur des cartes combo puissantes, prendra effet le 15 septembre 2025.",
                LocalDateTime.of(2025, Month.SEPTEMBER, 9, 0, 0),
                "https://w7.pngwing.com/pngs/400/921/png-transparent-wizards-of-the-coast-hd-logo-thumbnail.png"
        ));
        nouvelleRepository.save(new Nouvelle(
                "Récompenses écosystème : intégration d’une monnaie virtuelle liée à l’engagement communautaire",
                "Pour encourager les joueurs à participer à des événements, à partager des decks, ou à aider de nouveaux joueurs, le TCG Aeon Blades déploie un système de points “Echo” : ces points peuvent être échangés contre cartes digitales, sleeves, et même cartes physiques dans certaines boutiques partenaires.",
                "L’extension Essence des Anciens sortira le 30 septembre 2025 pour Elemental Tales TCG, avec les “Anciens Primordiaux” et un système de “marques élémentaires” qui influencent le terrain de jeu.",
                LocalDateTime.of(2025, Month.AUGUST, 2, 0, 0),
                "https://w7.pngwing.com/pngs/400/921/png-transparent-wizards-of-the-coast-hd-logo-thumbnail.png"
        ));
        nouvelleRepository.save(new Nouvelle(
                "Initiative verte : cartes et emballages 100% recyclables",
                "Le fabricant de cartes GreenForge annonce que toutes ses futures extensions seront produites avec des cartons certifiés FSC, encres végétales, et que les blisters seront remplacés par des enveloppes compostables ou des boîtiers réutilisables.",
                "À partir du 5 octobre 2025, les joueurs d’Altered TCG pourront imprimer physiquement leurs cartes numériques grâce à un nouveau service \"print on demand\", avec options foil et protections scellées.",
                LocalDateTime.of(2025, Month.AUGUST, 20, 0, 0),
                "https://w7.pngwing.com/pngs/400/921/png-transparent-wizards-of-the-coast-hd-logo-thumbnail.png"
        ));
        nouvelleRepository.save(new Nouvelle(
                "Lancement d’un mode solo scénarisé avec campagnes narratives",
                "Le jeu Chronicles of Valor introduit un mode campagne solo, où le joueur affronte une série de défis scénarisés (boss, quêtes, décisions qui modifient le récit). Les récompenses incluent des cartes spéciales “Héritage” qui se débloquent uniquement via ce mode.",
                "Chronicles of Valor propose un mode campagne solo avec des défis et choix qui influencent l’histoire, offrant en récompense des cartes “Héritage” exclusives.",
                LocalDateTime.of(2025, Month.AUGUST, 11, 0, 0),
                "https://w7.pngwing.com/pngs/400/921/png-transparent-wizards-of-the-coast-hd-logo-thumbnail.png"
        ));
        nouvelleRepository.save(new Nouvelle(
                "Nouvelle fonctionnalité : cartes évolutives (progression à travers le jeu)",
                "Wizards of the Coast tease une extension spéciale Conflux Multiversel, prévue pour le 1er mars 2026, réunissant des personnages issus de différents plans emblématiques dans un arc scénaristique inédit. Premiers spoilers attendus fin décembre.",
                "Wizards of the Coast prépare une extension spéciale appelée *Conflux Multiversel* pour Magic: The Gathering, prévue le 1er mars 2026. Elle réunira des personnages de différents plans dans un nouvel arc scénaristique.",
                LocalDateTime.of(2025, Month.AUGUST, 14, 0, 0),
                "https://w7.pngwing.com/pngs/400/921/png-transparent-wizards-of-the-coast-hd-logo-thumbnail.png"
        ));
    }

    private void createCriteria() {
        critereRepository.save(new Critere(
                1L,
                "Wizards",
                "2025-12-23",
                LocalDateTime.of(2025, Month.AUGUST, 14, 0, 0)
        ));
        critereRepository.save(new Critere(
                2L,
                "Wizards",
                "",
                LocalDateTime.of(2025, Month.APRIL, 8, 0, 0)
        ));
        critereRepository.save(new Critere(
                3L,
                "",
                "2025-08-25",
                LocalDateTime.of(2025, Month.FEBRUARY, 13, 0, 0)
        ));
        critereRepository.save(new Critere(
                4L,
                "Disney",
                "",
                LocalDateTime.of(2025, Month.MARCH, 1, 0, 0)
        ));
        critereRepository.save(new Critere(
                5L,
                "TCG",
                "",
                LocalDateTime.of(2024, Month.DECEMBER, 29, 0, 0)
        ));
    }
}