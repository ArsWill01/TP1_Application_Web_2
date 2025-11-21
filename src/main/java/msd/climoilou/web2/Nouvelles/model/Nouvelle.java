package msd.climoilou.web2.Nouvelles.model;

import jakarta.persistence.*;
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
public class Nouvelle {

    @Id
    @GeneratedValue
    private Long id;

    private String titre;

    @Lob
    private String texte;

    @Lob
    private String resume;

    private LocalDateTime date;

    private String img;

    public Nouvelle(){}

    public Nouvelle(String titre, String texte, String resume, LocalDateTime date, String img) {
        this.titre = titre;
        this.texte = texte;
        this.resume = resume;
        this.date = date;
        this.img = img;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public String getTexte() {
        return texte;
    }

    public void setTexte(String texte) {
        this.texte = texte;
    }

    public String getResume() {
        return resume;
    }

    public void setResume(String resume) {
        this.resume = resume;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }
}
