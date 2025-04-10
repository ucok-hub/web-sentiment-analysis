# Gunakan image resmi Node.js sebagai dasar
FROM node:18-alpine

# Tetapkan direktori kerja di dalam container menjadi /app
WORKDIR /app

# Copy file package.json dan package-lock.json (atau yarn.lock) ke dalam container
COPY package*.json ./

# Install dependency yang dibutuhkan
RUN npm install

# Copy seluruh source code ke dalam container
COPY . .

# Jalankan build untuk aplikasi Next.js (jika diperlukan)
RUN npm run build

# Tetapkan variabel environment, misalnya PORT
ENV PORT=3000

# Buka port 3000 agar container dapat diakses
EXPOSE 3000

# Perintah untuk menjalankan aplikasi saat container dijalankan
CMD ["npm", "start"]
