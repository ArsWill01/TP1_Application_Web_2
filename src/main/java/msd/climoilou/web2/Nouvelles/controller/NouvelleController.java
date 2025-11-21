package msd.climoilou.web2.Nouvelles.controller;

import msd.climoilou.web2.Nouvelles.model.Nouvelle;
import msd.climoilou.web2.Nouvelles.repository.NouvelleRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.Collection;

@CrossOrigin(origins = {"http://localhost:5173","http://localhost:5174","http://localhost:5175"})
@RestController
@RequestMapping("/nouvelles")
public class NouvelleController {

    @Autowired
    private NouvelleRepository nouvelleRepository;

    private Logger logger = LoggerFactory.getLogger(NouvelleController.class);

    @GetMapping
    public Collection<Nouvelle> getAllNouvelles() throws InterruptedException {
        logger.info("NouvelleController getAllNouvelles");

        return nouvelleRepository.findAll();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNouvelle(@PathVariable Long id) throws InterruptedException {
        logger.info("NouvelleController deleteNouvelle pour l'ID: {}", id);

        try {
            nouvelleRepository.deleteById(id);

            // Retourne une réponse 204 NO CONTENT si la suppression est réussie (ou si l'élément n'existait pas)
            // C'est le standard pour une suppression réussie sans corps de réponse.
            return ResponseEntity.noContent().build();

        } catch (EmptyResultDataAccessException e) {
            if (nouvelleRepository.existsById(id)) {
                // Gère les cas où l'élément existe mais la suppression a échoué pour d'autres raisons.
                return ResponseEntity.internalServerError().build();
            }

            // Si l'élément n'existe pas, on retourne 404 Not Found.
            logger.warn("Tentative de suppression d'une Nouvelle inexistante avec l'ID: {}", id);
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Nouvelle> updateNouvelle(@PathVariable Long id, @RequestBody Nouvelle detailsNouvelle) throws InterruptedException {
        logger.info("NouvelleController updateNouvelle pour l'ID: {}", id);

        try {
            nouvelleRepository.findNouvelleById(id);
            Nouvelle nouvelle;
            nouvelle = detailsNouvelle;
            nouvelleRepository.save(nouvelle);

            // Retourne une réponse 204 NO CONTENT si la suppression est réussie (ou si l'élément n'existait pas)
            // C'est le standard pour une suppression réussie sans corps de réponse.
            return ResponseEntity.noContent().build();

        } catch (EmptyResultDataAccessException e) {
            if (nouvelleRepository.existsById(id)) {
                // Gère les cas où l'élément existe mais la suppression a échoué pour d'autres raisons.
                return ResponseEntity.internalServerError().build();
            }

            // Si l'élément n'existe pas, on retourne 404 Not Found.
            logger.warn("Tentative d'update d'une Nouvelle inexistante avec l'ID: {}", id);
            return ResponseEntity.notFound().build();
        }
    }
}
