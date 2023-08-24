CREATE OR REPLACE DATABASE stellarships;
USE stellarships;

CREATE TABLE galaxies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(32) NOT NULL,
    description TEXT,
    image VARCHAR(32)
);

CREATE TABLE systems (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(32) NOT NULL,
    description TEXT,
    image VARCHAR(32),
    galaxy_id INT REFERENCES galaxies(id)
);

CREATE TABLE planets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(32) NOT NULL,
    description TEXT,
    distance FLOAT,
    image VARCHAR(32),
    system_id INT REFERENCES systems(id)
);

CREATE TABLE satellites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(32) NOT NULL,
    description TEXT,
    distance FLOAT,
    image VARCHAR(32),
    planet_id INT REFERENCES planets(id)
);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(32) NOT NULL,
    email VARCHAR(32) NOT NULL UNIQUE,
    password VARCHAR(64) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    avatar VARCHAR(32)
);

CREATE TABLE ships (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(32) NOT NULL,
    image VARCHAR(32)
);

CREATE TABLE chairs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(32) NOT NULL
);

CREATE TABLE pilots (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT REFERENCES users(id),
    ship_id INT REFERENCES ships(id)
);

CREATE TABLE travels (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pilot_id INT REFERENCES pilots(id),
    planet_id INT REFERENCES planets(id),
    date_time DATETIME,
    price INT
);

CREATE TABLE krus (
    travel_id INT REFERENCES travels(id),
    user_id INT REFERENCES users(id),
    chair_id INT REFERENCES chairs(id),
    PRIMARY KEY (travel_id, user_id, chair_id)
);

INSERT INTO galaxies
    (name, description, image) VALUES
    ('Bima Sakti', 'Galaksi tempat Bumi dan tata surya berada. Bima Sakti merupakan galaksi spiral dengan berbagai bintang, nebula, dan objek langit lainnya.', 'bima_sakti.jpg'),
    ('Andromeda', 'Galaksi spiral terbesar yang merupakan tetangga terdekat Bima Sakti. Galaksi ini memiliki miliaran bintang dan potensi untuk menggabung dengan Bima Sakti dalam miliaran tahun mendatang.', 'andromeda.jpg'),
    ('Triangulum', 'Galaksi spiral yang juga merupakan tetangga Bima Sakti. Meskipun lebih kecil dari Bima Sakti atau Andromeda, Galaksi Triangulum tetap menarik untuk diteliti.', 'triangulum.jpg');

INSERT INTO systems (name, description, image, galaxy_id)
VALUES
    ('Matahari', 'Bintang pusat tata surya kita. Bintang ini merupakan bintang tipe G dengan sistem planet di sekitarnya.', 'sun.jpg', 1),
    ('Sirius', 'Salah satu bintang terang di langit malam. Sirius adalah bintang ganda dengan komponen utama merupakan bintang deret utama tipe A.', 'sirius.jpg', 1),
    ('Vega', 'Bintang terang di konstelasi Lyra. Vega adalah bintang deret utama tipe A dan salah satu yang terdekat dengan Matahari.', 'vega.jpg', 1),
    ('Andromeda A', 'Salah satu bintang utama di galaksi Andromeda. Bintang ini merupakan bintang raksasa merah dengan luminositas tinggi.', 'andromeda_system1.jpg', 2),
    ('Andromeda B', 'Bintang ganda spektroskopi di galaksi Andromeda. Komponen-komponennya memiliki sifat-sifat yang menarik untuk studi astronomi.', 'andromeda_system2.jpg', 2),
    ('Andromeda C', 'Bintang tipe F di galaksi Andromeda. Memiliki ciri-ciri spektrum yang membuatnya menonjol di antara bintang lain.', 'andromeda_system3.jpg', 2),
    ('Triangulum X', 'Bintang misterius di galaksi Triangulum. Meskipun tidak terlalu terang, bintang ini menarik perhatian karena karakteristiknya yang unik.', 'triangulum_system1.jpg', 3),
    ('Triangulum Y', 'Bintang katai putih di galaksi Triangulum. Ukurannya yang kecil tapi intensitasnya tinggi membuatnya menarik untuk penelitian.', 'triangulum_system2.jpg', 3),
    ('Triangulum Z', 'Bintang kelas K di galaksi Triangulum. Memiliki variasi cahaya yang teratur dan berguna dalam penentuan jarak kosmik.', 'triangulum_system3.jpg', 3);

INSERT INTO planets (name, description, distance, image, system_id)
VALUES
    ('Bumi', 'Planet tempat tinggal manusia dan beragam bentuk kehidupan lainnya. Memiliki atmosfer yang mendukung kehidupan.', 1, 'earth.jpg', 1),
    ('Mars', 'Planet merah yang menjadi fokus eksplorasi manusia. Memiliki kondisi permukaan yang menunjukkan tanda-tanda air di masa lalu.', 1.5, 'mars.jpg', 1),
    ('Venus', 'Planet panas dengan atmosfer tebal yang menghasilkan efek rumah kaca. Permukaannya dipenuhi oleh gunung berapi dan dataran rata.', 0.7, 'venus.jpg', 1),

    ('Sirius B', 'Planet raksasa gas yang mengorbit bintang Sirius. Memiliki atmosfer yang kompleks dan banyak angin.', 8, 'gas_giant.jpg', 2),
    ('Sirius C', 'Planet es yang mengorbit jauh dari bintang Sirius. Permukaannya tertutup lapisan es tebal.', 15, 'ice_planet.jpg', 2),
    ('Sirius D', 'Planet kerdil yang mengorbit dalam jarak dekat dari bintang Sirius. Suhu permukaannya sangat panas.', 0.3, 'dwarf_planet.jpg', 2),

    ('Vega Prime', 'Planet yang memiliki atmosfer biru pekat dan ciri-ciri lautan luas. Memiliki potensi untuk penelitian biologi ekstrem.', 2, 'blue_planet.jpg', 3),
    ('Vega Minor', 'Planet kecil yang mengorbit cepat di sekitar bintang Vega. Permukaannya memiliki banyak kawah akibat tabrakan.', 0.5, 'small_planet.jpg', 3),
    ('Vega Ring', 'Planet cincin yang memiliki cincin partikel di sekitar ekuator. Penelitian sedang dilakukan untuk memahami asal usul cincin ini.', 1.8, 'ringed_planet.jpg', 3),

    ('Andromeda Prime', 'Planet besar dengan atmosfer tebal. Memiliki beberapa bulan besar yang mengorbit.', 5, 'gas_giant.jpg', 4),
    ('Andromeda Minor', 'Planet berbatu dengan permukaan yang banyak terdiri dari pegunungan dan lembah. Terdapat jejak aktivitas vulkanik.', 1.2, 'rocky_planet.jpg', 4),
    ('Andromeda Oasis', 'Planet dengan lautan luas yang membentang. Atmosfernya kaya akan oksigen dan mendukung kehidupan.', 3.8, 'ocean_planet.jpg', 4),

    ('Andromeda B Moon 1', 'Satelit alami dari bintang Andromeda B. Permukaannya banyak ditutupi kawah akibat tabrakan.', 0.1, 'moon.jpg', 5),
    ('Andromeda B Moon 2', 'Satelit dengan permukaan berbatu dan banyak kubah vulkanik. Memiliki atmosfer tipis.', 0.15, 'moon.jpg', 5),
    ('Andromeda B Moon 3', 'Satelit yang memiliki lapisan es tebal di permukaannya. Memiliki pemandangan indah dari luar angkasa.', 0.18, 'moon.jpg', 5),

    ('Andromeda C Red', 'Planet yang mengorbit dengan jarak dekat dari bintang. Permukaannya tertutup awan merah pekat.', 0.25, 'red_planet.jpg', 6),
    ('Andromeda C Blue', 'Planet dengan atmosfer biru terang yang menonjol di antara bintang-bintang lainnya. Permukaannya memiliki banyak danau.', 0.4, 'blue_planet.jpg', 6),
    ('Andromeda C Green', 'Planet dengan vegetasi hijau yang luas. Atmosfernya mengandung banyak oksigen.', 0.6, 'green_planet.jpg', 6),


    ('Triangulum X Prime', 'Planet dengan atmosfer kering dan permukaan gurun luas. Terdapat angin kencang yang membentuk dune-dune besar.', 1.2, 'desert_planet.jpg', 7),
    ('Triangulum X Moon 1', 'Satelit yang mengorbit planet Triangulum X. Permukaannya memiliki banyak kawah.', 0.15, 'moon.jpg', 7),
    ('Triangulum X Moon 2', 'Satelit dengan permukaan yang terdiri dari lapisan es dan bebatuan. Memiliki banyak ngarai.', 0.18, 'moon.jpg', 7),

    ('Triangulum Y Prime', 'Planet dengan permukaan yang mengalami pelapukan berat. Banyak fitur geologi menarik di permukaannya.', 0.8, 'rocky_planet.jpg', 8),
    ('Triangulum Y Moon 1', 'Satelit alami dari bintang Triangulum Y. Permukaannya ditutupi oleh berbagai jenis batuan.', 0.12, 'moon.jpg', 8),
    ('Triangulum Y Moon 2', 'Satelit dengan permukaan berlubang yang menunjukkan tanda-tanda aktivitas vulkanik di masa lalu.', 0.14, 'moon.jpg', 8),

    ('Triangulum Z Prime', 'Planet dengan lingkungan yang keras dan penuh dengan perubahan cuaca ekstrem. Permukaannya dipenuhi oleh batu-batu besar.', 0.9, 'harsh_planet.jpg', 9),
    ('Triangulum Z Moon 1', 'Satelit yang mengorbit planet Triangulum Z. Permukaannya memiliki jejak-jejak pembentukan kawah.', 0.11, 'moon.jpg', 9),
    ('Triangulum Z Moon 2', 'Satelit dengan permukaan yang sebagian besar tertutup oleh es tebal. Menunjukkan tanda-tanda adanya air di masa lalu.', 0.17, 'moon.jpg', 9);

INSERT INTO ships 
    (name, image) VALUES
    ('Garuda systemship 1', 'gs-1.jpg'),
    ('Angkasa Jaya 45', 'aj-45.jpg'),
    ('Sayap Bima 2000', 'sb-2000.jpg');

SET @hash = '$2a$04$9BCWozibpRYOmiYjyFDb1evMrViLgwQDXsKivzff9kyOY1/.7tlrK';

INSERT INTO users
    (name, email, password, is_admin) VALUES
    ('Romi Kusuma Bakti', 'romi@gmail.com', @hash, TRUE),
    ('Anggi Permana', 'anggi@gmail.com', @hash, FALSE),
    ('Ali Hanafiah', 'ali@gmail.com', @hash, FALSE);