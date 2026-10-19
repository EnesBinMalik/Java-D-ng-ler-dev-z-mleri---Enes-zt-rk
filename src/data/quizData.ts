import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Java'da bir sayının hem 3'e hem de 4'e tam bölünebildiğini kontrol eden en doğru koşul ifadesi hangisidir?",
    options: [
      "if (i % 3 == 0 || i % 4 == 0)",
      "if (i % 3 == 0 && i % 4 == 0)",
      "if (i / 3 == 0 && i / 4 == 0)",
      "if (i % 12 != 0)"
    ],
    correctIndex: 1,
    explanation: "Mantıksal VE (&&) operatörü her iki şartın da aynı anda sağlanmasını (True) gerektirir. i % 3 == 0 sayısı 3'e, i % 4 == 0 ise 4'e kalansız bölündüğünü bildirir."
  },
  {
    id: 2,
    question: "Aşağıdaki kod parçasında konsola hangi değer yazdırılır?",
    codeSnippet: `int toplam = 30;
int adet = 4;
double ortalama = toplam / adet;
System.out.println(ortalama);`,
    options: [
      "7.5",
      "7.0",
      "8.0",
      "Hata verir (Compile Error)"
    ],
    correctIndex: 1,
    explanation: "Java'da iki int tipindeki değişken bölündüğünde sonuç da int (tamsayı) olur: 30 / 4 = 7. Ardından bu değer double değişkene atanırken 7.0 olur. Ondalıklı doğru sonuç (7.5) için (double) toplam / adet şeklinde tip dönüşümü (type casting) yapılmalıdır!"
  },
  {
    id: 3,
    question: "Kullanıcı 10 sayısını girdiğinde, 0'dan 10'a kadar (0 hariç) 3 ve 4'e tam bölünen sayı adedi kaçtır?",
    options: [
      "0",
      "1",
      "2",
      "3"
    ],
    correctIndex: 0,
    explanation: "3 ve 4'e bölünen en küçük pozitif tam sayı EKOK(3, 4) = 12'dir. 10 sayısı 12'den küçük olduğu için bu aralıkta hiç sayı bulunamaz ve adet = 0 olur. Bu nedenle programda sıfıra bölme hatasını önlemek için (adet > 0) kontrolü şarttır!"
  },
  {
    id: 4,
    question: "1'den n'e kadar olan sayılardan 3 ve 4'e bölünenleri bulurken döngü adımını 12'şer artırmak (i += 12) ne kazandırır?",
    options: [
      "Kodun bellek kullanımını 12 kat artırır.",
      "Gereksiz if kontrollerini atlayarak algoritma hızını yaklaşık 12 kat artırır (Zaman Karmaşıklığı O(N/12)).",
      "Java derleyicisinde döngüyü sonsuz döngüye sokar.",
      "Yalnızca negatif sayılarda çalışmasını sağlar."
    ],
    correctIndex: 1,
    explanation: "EKOK(3,4) = 12 olduğu için aradaki 11 sayıyı hiç test etmeden doğrudan 12, 24, 36... sayılarına atlamak iterasyon sayısını 12 kat azaltır ve işlemci yükünü optimize eder."
  }
];
