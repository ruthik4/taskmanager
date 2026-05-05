package com.taskmanager.demo.service;

import com.taskmanager.demo.dto.ProjectRequest;
import com.taskmanager.demo.entity.Project;
import com.taskmanager.demo.entity.User;
import com.taskmanager.demo.repository.ProjectRepository;
import com.taskmanager.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepo;

    @Autowired
    private UserRepository userRepo;

    public Project createProject(ProjectRequest request, String userEmail) {
        User user = userRepo.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Project project = new Project();
        project.setName(request.getName());
        project.setCreatedBy(user);

        return projectRepo.save(project);
    }

    public List<Project> getAllProjects() {
        return projectRepo.findAll();
    }
}
