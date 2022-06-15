package com.good.things.domain.repository;

import java.time.LocalDate;

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
}
