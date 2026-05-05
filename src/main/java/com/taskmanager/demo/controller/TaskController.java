package com.taskmanager.demo.controller;

import com.taskmanager.demo.dto.TaskRequest;
import com.taskmanager.demo.entity.Status;
import com.taskmanager.demo.entity.Task;
import com.taskmanager.demo.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    // CREATE TASK
    @PostMapping
    public Task createTask(@RequestBody TaskRequest request) {
        return taskService.createTask(request);
    }

    // GET TASKS BY PROJECT
    @GetMapping("/project/{projectId}")
    public List<Task> getTasks(@PathVariable Long projectId) {
        return taskService.getTasksByProject(projectId);
    }

    // UPDATE STATUS
    @PutMapping("/{taskId}")
    public Task updateStatus(
            @PathVariable Long taskId,
            @RequestParam Status status
    ) {
        return taskService.updateStatus(taskId, status);
    }
}
