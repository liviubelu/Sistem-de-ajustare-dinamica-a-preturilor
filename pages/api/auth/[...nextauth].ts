import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import sql from 'mssql';
import bcrypt from 'bcryptjs';

const config = {
  user: 'nextjs',
  password: 'Parola123!',
  server: 'localhost',
  database: 'Market_sql',
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) return null;

        try {
          // Conectare la baza de date
          await sql.connect(config);

          // Caută user după email
          const result = await sql.query`
            SELECT * FROM users WHERE email = ${credentials.email}
          `;

          const user = result.recordset[0];
          if (!user) return null;

          // Verifică parola
          const isValid = await bcrypt.compare(credentials.password, user.PasswordHash);
          if (!isValid) return null;

          // Returnează user-ul (datele care vor fi stocate în sesiune)
          return {
            id: user.UserID,
            email: user.Email,
            firstName: user.FirstName,
            lastName: user.LastName,
        };
        } catch (error) {
          console.error("Autentificare eroare:", error);
          return null;
        }
      }
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        id: token.id,
        email: token.email,
        firstName: token.firstName,
        lastName: token.lastName,
      };
      return session;
    }
  },

  pages: {
    signIn: "/signin",
  }
});
