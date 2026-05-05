package com.taskmanager.demo.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class TaskRequest {
    private String title;
    private String description;
    private LocalDate deadline;
    private Long assignedUserId;
    private Long projectId;
}
