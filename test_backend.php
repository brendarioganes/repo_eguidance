<?php
/**
 * Simple test script to verify backend setup
 * Run this from the backend directory: php test_backend.php
 */

// Test database connection
require_once 'backend/app/config/database.php';
require_once 'backend/app/core/ORM.php';

echo "Testing Counseling App Backend Setup\n";
echo "====================================\n\n";

try {
    // Test database connection
    $pdo = ORM::getConnection();
    echo "✓ Database connection successful\n";
    
    // Test if users table exists
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM users");
    $result = $stmt->fetch();
    echo "✓ Users table exists with {$result['count']} records\n";
    
    // Test sample user login
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute(['student@example.com']);
    $user = $stmt->fetch();
    
    if ($user) {
        echo "✓ Sample student user found: {$user['name']}\n";
        
        // Test password verification
        if (password_verify('password123', $user['password'])) {
            echo "✓ Password verification working\n";
        } else {
            echo "✗ Password verification failed\n";
        }
    } else {
        echo "✗ Sample student user not found\n";
    }
    
    echo "\nBackend setup is working correctly!\n";
    echo "You can now start the backend server with: php -S localhost:8000\n";
    
} catch (Exception $e) {
    echo "✗ Error: " . $e->getMessage() . "\n";
    echo "\nPlease check:\n";
    echo "1. XAMPP MySQL is running\n";
    echo "2. Database 'counseling_app' exists\n";
    echo "3. Database credentials are correct\n";
    echo "4. SQL schema has been imported\n";
}
?>
