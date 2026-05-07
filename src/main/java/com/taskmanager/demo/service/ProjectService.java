package com.taskmanager.demo.service;

import com.taskmanager.demo.dto.ProjectRequest;
import com.taskmanager.demo.entity.Project;
import com.taskmanager.demo.entity.Role;
import com.taskmanager.demo.entity.User;
import com.taskmanager.demo.repository.ProjectRepository;
import com.taskmanager.demo.repository.TaskRepository;
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

    @Autowired
    private TaskRepository taskRepo;

    public void deleteProject(Long projectId, String email) {
        User admin = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (admin.getRole() != Role.ADMIN) {
            throw new RuntimeException("Only ADMIN can delete projects");
        }

        Project project = projectRepo.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        taskRepo.deleteAll(taskRepo.findByProjectId(projectId));

        projectRepo.delete(project);
    }

    public Project createProject(ProjectRequest request, String userEmail) {
        User user = userRepo.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getRole() != Role.ADMIN) {
            throw new RuntimeException("Only ADMIN can create projects");
        }

        Project project = new Project();
        project.setName(request.getName());
        project.setCreatedBy(user);

        return projectRepo.save(project);
    }

    public List<Project> getProjectsForUser(String email) {
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getRole() == Role.ADMIN) {
            return projectRepo.findAll();
        }

        return projectRepo.findByMembersEmail(email);
    }

    public Project addMember(Long projectId, Long userId, String email) {

        User admin = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (admin.getRole() != Role.ADMIN) {
            throw new RuntimeException("Only ADMIN can add members");
        }

        Project project = projectRepo.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        project.getMembers().add(user);

        return projectRepo.save(project);
    }

    public Project removeMember(Long projectId, Long userId, String email) {
        User admin = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (admin.getRole() != Role.ADMIN) {
            throw new RuntimeException("Only ADMIN can remove members");
        }

        Project project = projectRepo.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        project.getMembers().remove(user);

        return projectRepo.save(project);
    }
}
