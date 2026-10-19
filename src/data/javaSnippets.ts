export interface JavaCodeSnippet {
  id: string;
  title: string;
  fileName: string;
  description: string;
  author: string;
  code: string;
}

export const JAVA_SNIPPETS: JavaCodeSnippet[] = [
  {
    id: 'homework_standard',
    title: "Ödev: 3 ve 4'e Tam Bölünenlerin Ortalaması (Standart Çözüm)",
    fileName: "OdevBolunmeOrtalamasi.java",
    description: "0'dan (veya 1'den) girilen sayıya kadar olan sayılardan hem 3'e hem 4'e kalansız bölünenleri sayıp ortalamasını hesaplar.",
    author: "Enes Öztürk",
    code: `import java.util.Scanner;

/**
 * Patika.dev - Java 101: Döngüler Ödevi
 * 
 * Soru: 0'dan girilen sayıya kadar olan sayılardan 
 * 3 ve 4'e tam bölünen sayıların ortalamasını hesaplayan program.
 * 
 * @author Enes Öztürk
 * @version 1.0
 */
public class OdevBolunmeOrtalamasi {

    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.println("==================================================");
        System.out.println("  Java 101 - 3 ve 4'e Bölünenlerin Ortalaması");
        System.out.println("  Geliştirici: Enes Öztürk");
        System.out.println("==================================================");

        System.out.print("Lütfen bir pozitif tam sayı giriniz: ");
        int hedefSayi = input.nextInt();

        int toplam = 0;
        int adet = 0;

        // 1'den girilen sayıya kadar kontrol ediyoruz (0 dahil edilmemiştir)
        for (int i = 1; i <= hedefSayi; i++) {
            // Bir sayının hem 3'e hem 4'e bölünmesi: (i % 3 == 0 && i % 4 == 0)
            if (i % 3 == 0 && i % 4 == 0) {
                System.out.println("-> Bulunan sayı: " + i);
                toplam += i;
                adet++;
            }
        }

        System.out.println("--------------------------------------------------");
        // Sıfıra bölme hatasını (ArithmeticException) önleme kontrolü
        if (adet > 0) {
            // Tamsayı bölmesi tuzağını önlemek için (double) tip dönüşümü yapılır
            double ortalama = (double) toplam / adet;
            System.out.println("3 ve 4'e tam bölünen sayı adedi : " + adet);
            System.out.println("Bu sayıların toplamı            : " + toplam);
            System.out.printf("Bu sayıların ortalaması         : %.2f\\n", ortalama);
        } else {
            System.out.println("1 ile " + hedefSayi + " arasında 3 ve 4'e tam bölünen sayı bulunamadı!");
        }

        System.out.println("==================================================");
        System.out.println("Program başarıyla tamamlandı. - Enes Öztürk");
        
        input.close();
    }
}`
  },
  {
    id: 'homework_optimized',
    title: "Ödev: Optimize Çözüm (EKOK / 12'şer Artış)",
    fileName: "OdevOptimizeEkok.java",
    description: "EKOK(3, 4) = 12 kuralı sayesinde her sayıyı tek tek kontrol etmek yerine döngüyü 12'şer artırarak O(N/12) zamanda çalışan çözüm.",
    author: "Enes Öztürk",
    code: `import java.util.Scanner;

/**
 * Patika.dev - Java 101: Döngüler Ödevi (Optimize Çözüm)
 * Matematiksel İlke: EKOK(3, 4) = 12 olduğundan
 * her sayıyı test etmek yerine döngüyü 12'şer artırabiliriz.
 * 
 * @author Enes Öztürk
 */
public class OdevOptimizeEkok {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Sınır sayısını giriniz: ");
        int limit = scanner.nextInt();

        int toplam = 0;
        int sayac = 0;

        // Doğrudan 12'nin katları üzerinden dönülür
        for (int i = 12; i <= limit; i += 12) {
            toplam += i;
            sayac++;
            System.out.println("Eşleşen sayı: " + i + " (Geçerli Toplam: " + toplam + ")");
        }

        if (sayac > 0) {
            double ortalama = (double) toplam / sayac;
            System.out.println("Bulunan adet : " + sayac);
            System.out.println("Genel Toplam : " + toplam);
            System.out.println("Ortalama     : " + ortalama);
        } else {
            System.out.println("Girilen değere (" + limit + ") kadar 12'nin katı bulunamadı.");
        }

        System.out.println("İmza: Enes Öztürk");
        scanner.close();
    }
}`
  },
  {
    id: 'even_numbers',
    title: "Pratik: Girilen Sayıya Kadar Çift Sayıları Bulan Program",
    fileName: "CiftSayilariBulucu.java",
    description: "Kullanıcının girdiği sayıya kadar olan tüm çift sayıları ekrana yazdıran ve adedini hesaplayan Java programı.",
    author: "Enes Öztürk",
    code: `import java.util.Scanner;

/**
 * Patika.dev - Java 101: Döngüler Pratiği
 * Kullanıcının girdiği sayıya kadar çift sayıları bulan program.
 * 
 * @author Enes Öztürk
 */
public class CiftSayilariBulucu {

    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.println("=== ÇİFT SAYILARI BULMA PROGRAMI ===");
        System.out.println("Hazırlayan: Enes Öztürk");
        System.out.print("Lütfen bir sayı giriniz: ");
        int k = input.nextInt();

        System.out.println("\\n--- [Yöntem 1: for döngüsü ve Modulo (%) Operatörü] ---");
        int ciftAdet = 0;
        for (int i = 1; i <= k; i++) {
            if (i % 2 == 0) {
                System.out.print(i + " ");
                ciftAdet++;
            }
        }
        System.out.println("\\nToplam çift sayı adedi: " + ciftAdet);

        System.out.println("\\n--- [Yöntem 2: 2'şer Adımlı Döngü] ---");
        for (int i = 2; i <= k; i += 2) {
            System.out.print(i + " ");
        }
        System.out.println();

        System.out.println("\\n--- [Yöntem 3: while döngüsü ile] ---");
        int sayac = 1;
        while (sayac <= k) {
            if (sayac % 2 == 0) {
                System.out.print(sayac + " ");
            }
            sayac++;
        }
        System.out.println("\\n\\nProgram sona erdi. Enes Öztürk.");

        input.close();
    }
}`
  }
];
