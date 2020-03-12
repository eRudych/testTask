package com.testTask.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Value;

import java.util.List;

@Value
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserDayData {
    private final Long id;
    private List<Integer> userDayDataAboutHours;
}
