package com.good.things;

import java.time.LocalDate;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.good.things.domain.model.Diary;
import com.good.things.domain.service.DiaryService;

@RestController
public class FrontController {
  @Autowired
  private DiaryService diaryService;

  @GetMapping("/api/hello")
  public String hello() {
    return "Hello, the time at the server is now " + new Date() + "\n";
  }

  @GetMapping("/api/diary")
  public Diary getDiary() {
    // Diary diary = new Diary();
    // diary.setLocalDate(LocalDate.of(2022, 6, 13));
    // diary.setGood1("西野七瀬はやっぱり可愛い。");
    // diary.setGood2("ABEMAトーナメント面白かった。");
    // diary.setGood3("バックエンドAPI頑張って作る。");

    Diary diary = diaryService.findOne(LocalDate.of(2022, 6, 5), "tamuten310@gmail.com");

    return diary;
  }
}
