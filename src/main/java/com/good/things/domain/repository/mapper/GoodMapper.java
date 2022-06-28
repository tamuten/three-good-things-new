package com.good.things.domain.repository.mapper;

import java.time.LocalDate;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.good.things.domain.model.Diary;

@Mapper
public interface GoodMapper {
  public Diary findOne(LocalDate date, String mailAddress);
  public List<Diary> findAll(String mailAddress);
  public int save(@Param("diary") Diary diary, String mailAddress);
}
