package com.good.things;

import java.util.Date;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FrontController {
  @GetMapping("/api/hello")
  public String hello() {
    return "Hello, the time at the server is now " + new Date() + "\n";
  }
}
