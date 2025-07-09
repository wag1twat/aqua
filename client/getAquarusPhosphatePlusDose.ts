import { normal, volume } from './constants';

/***********************************************************************
 *  Дозировка «AquaRus Фосфат+» для вывода PO₄ к 1.4 mg/L
 *
 *  Предположение по инструкции производителя:
 *  ─────────────────────────────────────────────────────────────
 *  1 мл препарата ↑ PO₄ на 0.1 mg/L в 50 л воды
 *      ⇒  Δm = 0.1 mg/L × 50 L = 5 mg чистого PO₄  в 1 мл раствора
 *  ─────────────────────────────────────────────────────────────
 *
 *  Формулы
 *  --------------------------------------------------------------------
 *  ΔC      = target − measured               // mg/L
 *  mPo4    = ΔC × volume                     // mg  чистого PO₄
 *  doseMl  = mPo4 / 5                        // мл «AquaRus Фосфат+»
 **********************************************************************/

const potency = 7; // мг PO₄ в 1 мл (можно изменить, если у вас другая партия)

export function getAquarusPhosphatePlusDose(measured: number) {
    const deltaC = normal.po4 - measured; // mg/L

    if (deltaC <= 0) return 0; // ничего добавлять не нужно

    const requiredPo4 = deltaC * volume; // mg чистого PO₄
    const doseMl = requiredPo4 / potency;

    return +doseMl.toFixed(2); // округляем до сотых
}

// /* ---------- Пример использования ---------- */
// const dose = getAquarusPhosphatePlusDose({
//     measured: 0.8, // текущее значение
//     volume: 100, // литры
// });

// console.log(`Добавьте ${dose} мл «AquaRus Фосфат+»`);
// /*
//     Вывод:
//     Добавьте 12.00 мл «AquaRus Фосфат+»
//   */
