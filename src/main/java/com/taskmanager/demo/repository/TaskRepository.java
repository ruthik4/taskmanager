package com.taskmanager.demo.repository;

import com.taskmanager.demo.entity.Status;
import com.taskmanager.demo.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByProjectId(Long projectId);
    List<Task> findByAssignedToId(Long userId);

    long countByAssignedToId(Long userId);

    long countByAssignedToIdAndStatus(Long userId, Status status);

    long countByAssignedToIdAndDeadlineBeforeAndStatusNot(
            Long userId, LocalDate date, Status status);

    long countByStatus(Status status);

    long countByDeadlineBeforeAndStatusNot(LocalDate date, Status status);
}
