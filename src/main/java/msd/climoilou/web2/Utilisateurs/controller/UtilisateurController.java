package msd.climoilou.web2.Utilisateurs.controller;

import msd.climoilou.web2.Utilisateurs.model.Utilisateur;
import msd.climoilou.web2.Utilisateurs.repository.UtilisateurRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@CrossOrigin(origins = {"http://localhost:5173","http://localhost:5174","http://localhost:5175"})
@RestController
public class UtilisateurController {

    @Autowired
    private UtilisateurRepository nouvelleRepository;

    private Logger logger = LoggerFactory.getLogger(UtilisateurController.class);

    @GetMapping("/utilisateurs")
    public Collection<Utilisateur> getAllUtilisateurs() throws InterruptedException {
        logger.info("UtilisateurController getAllUtilisateurs");

        return nouvelleRepository.findAll();
    }
}
