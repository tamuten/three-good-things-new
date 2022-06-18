package com.good.things;

import java.time.LocalDate;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.good.things.domain.model.Diary;
import com.good.things.domain.service.DiaryService;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
public class FrontController {
  @Autowired
  private DiaryService diaryService;

  @GetMapping("/api/hello")
  public String hello() {
    return "Hello, the time at the server is now " + new Date() + "\n";
  }

  @GetMapping("/api/diary")
  public Diary getDiary(@RequestParam String date) {
    System.out.println(date);
    Diary diary = diaryService.findOne(LocalDate.parse(date), "tamuten310@gmail.com");
    return diary;
  }

  // curl -X POST -H "Content-Type: application/json" -d '{"date":"2022-06-17",
  // "good1":"こんにちは", "good2":"檜山沙耶です", "good3":"水戸市出身・美人お天気キャスターです"}'
  // localhost:8080/api/save
  @PostMapping("/api/save")
  public void save(@RequestBody Diary diary) {
    log.debug("[saving diary] = " + diary.toString());
    String mailAddress = "tamuten310@gmail.com";
    diaryService.save(diary, mailAddress);
  }
}
