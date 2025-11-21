package msd.climoilou.web2.Utilisateurs.model;

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
public class Utilisateur {

    @Id
    @GeneratedValue
    private Long id;

    private String type;

    private String nom;

    private LocalDateTime dateIncription;

    private LocalDateTime dateNaissance;

    public Utilisateur() {

    }

    public Utilisateur(String type, String nom, LocalDateTime dateIncription, LocalDateTime dateNaissance) {
        this.type = type;
        this.nom = nom;
        this.dateIncription = dateIncription;
        this.dateNaissance = dateNaissance;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public LocalDateTime getDateIncription() {
        return dateIncription;
    }

    public void setDateIncription(LocalDateTime dateIncription) {
        this.dateIncription = dateIncription;
    }

    public LocalDateTime getDateNaissance() {
        return dateNaissance;
    }

    public void setDateNaissance(LocalDateTime dateNaissance) {
        this.dateNaissance = dateNaissance;
    }
}
