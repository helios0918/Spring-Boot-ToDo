package jar.services;

import jar.dto.TodoDTO;
import jar.model.Todo;
import jar.model.User;
import jar.repo.TodoRepository;
import jar.repo.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class TodoService {

    private final TodoRepository todoRepository;
    private final UserRepository userRepository;

    public TodoService(TodoRepository todoRepository,
            UserRepository userRepository) {
        this.todoRepository = todoRepository;
        this.userRepository = userRepository;
    }

    private User getCurrentUser() {

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public TodoDTO createTodo(TodoDTO dto) {

        User user = getCurrentUser();

        Todo todo = new Todo();
        todo.setTitle(dto.getTitle());
        todo.setDescription(dto.getDescription());
        todo.setCompleted(false);
        todo.setUser(user);

        Todo saved = todoRepository.save(todo);

        return new TodoDTO(
                saved.getId(),
                saved.getTitle(),
                saved.getDescription(),
                saved.isCompleted());
    }

    public List<TodoDTO> getMyTodos() {

        User user = getCurrentUser();

        return todoRepository.findByUser(user)
                .stream()
                .map(todo -> new TodoDTO(
                        todo.getId(),
                        todo.getTitle(),
                        todo.getDescription(),
                        todo.isCompleted()))
                .collect(Collectors.toList());
    }

    public TodoDTO updateTodo(UUID id, TodoDTO dto) {

        User user = getCurrentUser();

        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found"));

        if (!todo.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized access");
        }

        todo.setTitle(dto.getTitle());
        todo.setDescription(dto.getDescription());
        todo.setCompleted(dto.isCompleted());

        Todo updated = todoRepository.save(todo);

        return new TodoDTO(
                updated.getId(),
                updated.getTitle(),
                updated.getDescription(),
                updated.isCompleted());
    }

    public void deleteTodo(UUID id) {

        User user = getCurrentUser();

        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found"));

        if (!todo.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized access");
        }

        todoRepository.delete(todo);
    }
}
