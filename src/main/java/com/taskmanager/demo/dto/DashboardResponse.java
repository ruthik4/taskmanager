package com.taskmanager.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DashboardResponse {
    private long totalTasks;
    private long completed;
    private long pending;
    private long overdue;
}
