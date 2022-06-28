package com.good.things.domain.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.good.things.domain.model.Diary;
import com.good.things.domain.repository.mapper.GoodMapper;

@Repository
public class GoodRepository {
  @Autowired
  private GoodMapper mapper;

  public Diary findOne(LocalDate date, String mailAddress) {
    return mapper.findOne(date, mailAddress);
  }

  public List<Diary> findAll(String mailAddress) {
    return mapper.findAll(mailAddress);
  }

  public int save(Diary diary, String mailAddress) {
    return mapper.save(diary, mailAddress);
  }
}
