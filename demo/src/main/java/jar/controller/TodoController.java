package jar.controller;

import jar.dto.TodoDTO;
import jar.services.TodoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/todos")
public class TodoController {

    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @PostMapping
    public TodoDTO createTodo(@RequestBody TodoDTO dto) {
        return todoService.createTodo(dto);
    }

    @GetMapping
    public List<TodoDTO> getMyTodos() {
        return todoService.getMyTodos();
    }

    @PutMapping("/{id}")
    public TodoDTO updateTodo(@PathVariable UUID id,
            @RequestBody TodoDTO dto) {
        return todoService.updateTodo(id, dto);
    }

    @DeleteMapping("/{id}")
    public String deleteTodo(@PathVariable UUID id) {
        todoService.deleteTodo(id);
        return "Todo deleted successfully";
    }
}
