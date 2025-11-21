package msd.climoilou.web2.Criteres.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Getter
@Setter
//@NoArgsConstructor
@ToString
@EqualsAndHashCode
@AllArgsConstructor
public class Critere {

    @Id
    @GeneratedValue
    private Long id;

    private Long idUser;
    private String textRecherche;
    private String dateRecherche;
    private LocalDateTime dateCreation;

    public Critere() {}

    public Critere(Long idUser, String textRecherche, String dateRecherche, LocalDateTime dateCreation) {
        this.idUser = idUser;
        this.textRecherche = textRecherche;
        this.dateRecherche = dateRecherche;
        this.dateCreation = dateCreation;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIdUser() {
        return idUser;
    }

    public void setIdUser(Long idUser) {
        this.idUser = idUser;
    }

    public String getTextRecherche() {
        return textRecherche;
    }

    public void setTextRecherche(String textRecherche) {
        this.textRecherche = textRecherche;
    }

    public String getDateRecherche() {
        return dateRecherche;
    }

    public void setDateRecherche(String dateRecherche) {
        this.dateRecherche = dateRecherche;
    }

    public LocalDateTime getDateCreation() {
        return dateCreation;
    }

    public void setDateCreation(LocalDateTime dateCreation) {
        this.dateCreation = dateCreation;
    }
}
