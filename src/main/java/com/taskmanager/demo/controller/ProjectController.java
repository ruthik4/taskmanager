package com.taskmanager.demo.controller;

import com.taskmanager.demo.dto.ProjectRequest;
import com.taskmanager.demo.entity.Project;
import com.taskmanager.demo.entity.User;
import com.taskmanager.demo.repository.ProjectRepository;
import com.taskmanager.demo.service.ProjectService;
import com.taskmanager.demo.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/projects")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private ProjectRepository projectRepo;

    // CREATE PROJECT
    @PostMapping
    public Project createProject(@RequestBody ProjectRequest request) {
        String email = org.springframework.security.core.context.SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();
        return projectService.createProject(request, email);
    }

    // GET ALL PROJECTS
    @GetMapping
    public List<Project> getProjects() {
        return projectService.getAllProjects();
    }

    @PostMapping("/{projectId}/members/{userId}")
    public Project addMember(
            @PathVariable Long projectId,
            @PathVariable Long userId
    ) {
        String email = org.springframework.security.core.context.SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        return projectService.addMember(projectId, userId, email);
    }

    @GetMapping("/{projectId}/members")
    public List<User> getMembers(@PathVariable Long projectId) {

        Project project = projectRepo.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        return project.getMembers();
    }
}
