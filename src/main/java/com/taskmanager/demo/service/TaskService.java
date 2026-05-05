package com.taskmanager.demo.service;

import com.taskmanager.demo.dto.TaskRequest;
import com.taskmanager.demo.entity.Project;
import com.taskmanager.demo.entity.Status;
import com.taskmanager.demo.entity.Task;
import com.taskmanager.demo.entity.User;
import com.taskmanager.demo.repository.ProjectRepository;
import com.taskmanager.demo.repository.TaskRepository;
import com.taskmanager.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private ProjectRepository projectRepo;

    public Task createTask(TaskRequest request) {

        User user = userRepo.findById(request.getAssignedUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Project project = projectRepo.findById(request.getProjectId())
                .orElseThrow(() -> new RuntimeException("Project not found"));

        Task task = new Task();
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setDeadline(request.getDeadline());
        task.setStatus(Status.PENDING);
        task.setAssignedTo(user);
        task.setProject(project);

        return taskRepo.save(task);
    }

    public List<Task> getTasksByProject(Long projectId) {
        return taskRepo.findByProjectId(projectId);
    }

    public Task updateStatus(Long taskId, Status status) {
        Task task = taskRepo.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setStatus(status);
        return taskRepo.save(task);
    }
}
