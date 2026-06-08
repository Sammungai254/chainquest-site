import hashlib
import hmac
import os
import base64

def scram_sha256(password, iterations=4096):
    """Generate SCRAM-SHA-256 hash and return formatted string"""
    # Generate random salt
    salt = os.urandom(16)
    
    # Generate salted password
    salted = hashlib.pbkdf2_hmac('sha256', password.encode(), salt, iterations, 32)
    
    # Generate keys
    client_key = hmac.new(salted, b"Client Key", hashlib.sha256).digest()
    stored_key = hashlib.sha256(client_key).digest()
    
    # Return formatted string
    salt_b64 = base64.b64encode(salt).decode()
    stored_b64 = base64.b64encode(stored_key).decode()
    return f"SCRAM-SHA-256${iterations}${salt_b64}${stored_b64}"

# Simple one-liner usage
if __name__ == "__main__":
    password = input("Enter password: ")
    hash_result = scram_sha256(password)
    print("\nSCRAM-SHA-256 Hash:")
    print(hash_result)