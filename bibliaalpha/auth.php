<?php
    require_once __DIR__ . '/config.php';

    $action = $_REQUEST['action'] ?? '';

    if ($action === 'logout') {
        session_destroy();
        header('Location: /index.php'); exit;
    }

    if ($action === 'login' && $_SERVER['REQUEST_METHOD'] === 'POST') {
        $email    = trim($_POST['email'] ?? '');
        $password = $_POST['password'] ?? '';
        if (!$email || !$password) { flash('error','Preencha e-mail e senha.'); header('Location: /index.php'); exit; }
        $user = find_user($email);
        if (!$user || !password_verify($password, $user['password'])) {
            flash('error','E-mail ou senha incorretos.'); header('Location: /index.php'); exit;
        }
        $_SESSION['uid'] = $user['id'];
        if (strtolower($user['email']) === strtolower(ADMIN_EMAIL)) header('Location: /admin/');
        elseif ($user['status'] === 'approved') header('Location: /app/');
        else header('Location: /pending.php');
        exit;
    }

    if ($action === 'register' && $_SERVER['REQUEST_METHOD'] === 'POST') {
        $name  = trim($_POST['name'] ?? '');
        $email = strtolower(trim($_POST['email'] ?? ''));
        $pass  = $_POST['password'] ?? '';
        $pass2 = $_POST['password2'] ?? '';
        if (!$name||!$email||!$pass) { flash('error','Preencha todos os campos.'); header('Location: /register.php'); exit; }
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) { flash('error','E-mail inválido.'); header('Location: /register.php'); exit; }
        if (strlen($pass)<8) { flash('error','Senha deve ter ao menos 8 caracteres.'); header('Location: /register.php'); exit; }
        if ($pass !== $pass2) { flash('error','As senhas não coincidem.'); header('Location: /register.php'); exit; }
        if (find_user($email)) { flash('error','Já existe uma conta com este e-mail.'); header('Location: /register.php'); exit; }
        $users = load_users();
        $new = [
            'id'         => uniqid('u', true),
            'name'       => $name,
            'email'      => $email,
            'password'   => password_hash($pass, PASSWORD_DEFAULT),
            'status'     => (strtolower($email)===strtolower(ADMIN_EMAIL)) ? 'approved' : 'pending',
            'created_at' => date('Y-m-d H:i:s'),
        ];
        $users[] = $new;
        save_users($users);
        $_SESSION['uid'] = $new['id'];
        if ($new['status'] === 'approved') header('Location: /admin/');
        else { flash('info','Conta criada! Aguarde aprovação do administrador.'); header('Location: /pending.php'); }
        exit;
    }

    header('Location: /index.php'); exit;
    ?>
