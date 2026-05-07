-- Migration: Add Admin User
-- This script creates an admin user in Supabase Auth.
-- IMPORTANT: Change the email and password below before running this in production.

DO $$
DECLARE
    user_id UUID := gen_random_uuid();
    user_email TEXT := 'admin@vaishalipestcontrol.in';
    user_password TEXT := 'Vaishali@2026'; -- Recommended to change this!
BEGIN
    -- Only insert if the user doesn't already exist
    IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = user_email) THEN
        -- Insert into auth.users
        INSERT INTO auth.users (
            instance_id,
            id,
            aud,
            role,
            email,
            encrypted_password,
            email_confirmed_at,
            recovery_sent_at,
            last_sign_in_at,
            raw_app_meta_data,
            raw_user_meta_data,
            created_at,
            updated_at,
            confirmation_token,
            email_change,
            email_change_token_new,
            recovery_token
        ) VALUES (
            '00000000-0000-0000-0000-000000000000',
            user_id,
            'authenticated',
            'authenticated',
            user_email,
            extensions.crypt(user_password, extensions.gen_salt('bf')),
            now(),
            now(),
            now(),
            '{"provider":"email","providers":["email"]}',
            '{"full_name":"Admin User"}',
            now(),
            now(),
            '',
            '',
            '',
            ''
        );

        -- Insert into auth.identities
        INSERT INTO auth.identities (
            id,
            user_id,
            identity_data,
            provider,
            provider_id,
            last_sign_in_at,
            created_at,
            updated_at
        ) VALUES (
            gen_random_uuid(),
            user_id,
            format('{"sub":"%s","email":"%s"}', user_id::text, user_email)::jsonb,
            'email',
            user_id::text, -- provider_id is the user ID for email provider
            now(),
            now(),
            now()
        );

        RAISE NOTICE 'Admin user created with email: %', user_email;
    ELSE
        RAISE NOTICE 'Admin user with email % already exists.', user_email;
    END IF;
END $$;
