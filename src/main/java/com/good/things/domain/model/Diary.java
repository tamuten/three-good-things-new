package com.good.things.domain.model;

import java.time.LocalDate;

import lombok.Data;

@Data
public class Diary {
  private LocalDate date;
  private String good1;
  private String good2;
  private String good3;
}
