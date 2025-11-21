package msd.climoilou.web2.Criteres.controller;

import msd.climoilou.web2.Criteres.model.Critere;
import msd.climoilou.web2.Criteres.repository.CritereRepository;
import msd.climoilou.web2.Nouvelles.model.Nouvelle;
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
@RequestMapping("/criteres")
public class CritereController {

    @Autowired
    private CritereRepository critereRepository;

    private Logger logger = LoggerFactory.getLogger(CritereController.class);

    @GetMapping
    public Collection<Critere> getAllCriteres() throws InterruptedException {
        logger.info("CritereController getAllCriteres");

        return critereRepository.findAll();
    }

    @GetMapping
    public Collection<Critere> getNombreNouvelles() throws InterruptedException {
        logger.info("NouvelleController getNombreNouvelles");

        return critereRepository.findAll();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCritere(@PathVariable Long id) throws InterruptedException {
        logger.info("CritereController deleteCritere pour l'ID: {}", id);

        try {
            critereRepository.deleteById(id);

            return ResponseEntity.noContent().build();

        } catch (EmptyResultDataAccessException e) {
            if (critereRepository.existsById(id)) {
                return ResponseEntity.internalServerError().build();
            }

            logger.warn("Tentative de suppression d'un Critère inexistante avec l'ID: {}", id);
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Critere> createCritere(@RequestBody Critere critere) {
        logger.info("CritereController createCritere");

        try {
            critere.setId(null);

            Critere critereSauvegardee = critereRepository.save(critere);

            return ResponseEntity
                    .created(URI.create("/criteres/" + critereSauvegardee.getId()))
                    .body(critereSauvegardee);

        } catch (Exception e) {
            logger.error("Erreur lors de la création du Critère: {}", e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
}
