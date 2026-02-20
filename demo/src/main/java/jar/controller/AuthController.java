package jar.controller;

import jar.dto.AuthRequest;
import jar.dto.AuthResponse;
<<<<<<< HEAD
=======
import jar.dto.RegisterRequest;
>>>>>>> 3afc66f (Updated)
import jar.services.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

<<<<<<< HEAD
=======
    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {
        return authService.register(request);
    }

>>>>>>> 3afc66f (Updated)
    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest request) {
        String token = authService.login(request);
        return new AuthResponse(token);
    }

<<<<<<< HEAD
}

=======
}
>>>>>>> 3afc66f (Updated)
