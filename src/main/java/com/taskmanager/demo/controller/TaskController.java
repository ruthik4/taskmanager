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
        String email = org.springframework.security.core.context.SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();
        return taskService.createTask(request, email);
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
        String email = org.springframework.security.core.context.SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();
        return taskService.updateStatus(taskId, status, email);
    }

    // UNASSIGN TASK
    @PutMapping("/{taskId}/unassign")
    public Task unassignTask(@PathVariable Long taskId) {
        String email = org.springframework.security.core.context.SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();
        return taskService.unassignTask(taskId, email);
    }

    // REASSIGN TASK
    @PutMapping("/{taskId}/assign")
    public Task assignTask(
            @PathVariable Long taskId,
            @RequestParam Long userId
    ) {
        String email = org.springframework.security.core.context.SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();
        return taskService.assignTask(taskId, userId, email);
    }

    // DELETE TASK
    @DeleteMapping("/{taskId}")
    public void deleteTask(@PathVariable Long taskId) {
        String email = org.springframework.security.core.context.SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();
        taskService.deleteTask(taskId, email);
    }
}
