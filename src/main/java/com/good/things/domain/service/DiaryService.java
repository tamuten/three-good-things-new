package com.good.things.domain.service;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.good.things.domain.model.Diary;
import com.good.things.domain.repository.GoodRepository;

@Service
@Transactional
public class DiaryService {
  @Autowired
  private GoodRepository repository;

  public Diary findOne(LocalDate date, String mailAddress) {
    return repository.findOne(date, mailAddress);
  }
}
