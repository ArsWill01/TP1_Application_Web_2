package msd.climoilou.web2.Criteres.repository;

import msd.climoilou.web2.Criteres.model.Critere;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;

public interface CritereRepository extends JpaRepository<Critere, Long> {
    Collection<Critere> findCritereById(Long id);

}
