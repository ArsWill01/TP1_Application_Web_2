package msd.climoilou.web2.Utilisateurs.repository;

import msd.climoilou.web2.Utilisateurs.model.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;

public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {
    Collection<Utilisateur> findUtilisateurById(Long id);
}
