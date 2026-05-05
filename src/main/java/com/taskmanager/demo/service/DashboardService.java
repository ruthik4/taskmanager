package com.taskmanager.demo.service;

import com.taskmanager.demo.dto.DashboardResponse;
import com.taskmanager.demo.entity.Role;
import com.taskmanager.demo.entity.Status;
import com.taskmanager.demo.entity.User;
import com.taskmanager.demo.repository.TaskRepository;
import com.taskmanager.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class DashboardService {

    @Autowired
    private TaskRepository taskRepo;

    @Autowired
    private UserRepository userRepo;

    public DashboardResponse getDashboard(String email) {

        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 🔥 ADMIN DASHBOARD (GLOBAL)
        if (user.getRole() == Role.ADMIN) {

            long total = taskRepo.count();
            long completed = taskRepo.countByStatus(Status.COMPLETED);
            long pending = taskRepo.countByStatus(Status.PENDING);
            long overdue = taskRepo.countByDeadlineBeforeAndStatusNot(
                    LocalDate.now(), Status.COMPLETED);

            return new DashboardResponse(total, completed, pending, overdue);
        }

        // 👤 MEMBER DASHBOARD (USER-SPECIFIC)
        Long userId = user.getId();

        long total = taskRepo.countByAssignedToId(userId);
        long completed = taskRepo.countByAssignedToIdAndStatus(userId, Status.COMPLETED);
        long pending = taskRepo.countByAssignedToIdAndStatus(userId, Status.PENDING);
        long overdue = taskRepo.countByAssignedToIdAndDeadlineBeforeAndStatusNot(
                userId, LocalDate.now(), Status.COMPLETED);

        return new DashboardResponse(total, completed, pending, overdue);
    }
}
