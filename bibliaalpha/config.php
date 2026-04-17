<?php
    // ============================================================
    // ÚNICA CONFIGURAÇÃO NECESSÁRIA — edite só este bloco
    // ============================================================
    define('ADMIN_EMAIL', 'analista.ericksilva@gmail.com');  // sempre aprovado
    define('APP_NAME',    'Bíblia Alpha');
    define('APP_URL',     'https://bibliaalpha.studiologos.com.br');
    define('DATA_FILE',   __DIR__ . '/data/users.json');
    define('SESSION_KEY', 'ba_auth');
    // ============================================================

    session_name(SESSION_KEY);
    session_start();

    function load_users(): array {
        if (!file_exists(DATA_FILE)) return [];
        return json_decode(file_get_contents(DATA_FILE), true) ?: [];
    }
    function save_users(array $u): void {
        $dir = dirname(DATA_FILE);
        if (!is_dir($dir)) mkdir($dir, 0750, true);
        file_put_contents(DATA_FILE, json_encode($u, JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE), LOCK_EX);
    }
    function find_user(string $email): ?array {
        foreach (load_users() as $u)
            if (strtolower($u['email']) === strtolower($email)) return $u;
        return null;
    }
    function current_user(): ?array {
        if (empty($_SESSION['uid'])) return null;
        foreach (load_users() as $u)
            if ($u['id'] === $_SESSION['uid']) return $u;
        return null;
    }
    function require_approved(): void {
        $u = current_user();
        if (!$u) { header('Location: /index.php'); exit; }
        if ($u['status'] !== 'approved') { header('Location: /pending.php'); exit; }
    }
    function require_admin(): void {
        $u = current_user();
        if (!$u || strtolower($u['email']) !== strtolower(ADMIN_EMAIL))
            { header('Location: /index.php'); exit; }
    }
    function flash(string $k, ?string $v = null): ?string {
        if ($v !== null) { $_SESSION['flash_'.$k] = $v; return null; }
        $out = $_SESSION['flash_'.$k] ?? null;
        unset($_SESSION['flash_'.$k]);
        return $out;
    }
    ?>
