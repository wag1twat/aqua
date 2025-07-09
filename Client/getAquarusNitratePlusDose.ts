/**************************************************************************
 *  Дозировка «AquaRus Нитрат+» для вывода NO₃ к целевому уровню
 *
 *  Предположение по инструкции производителя (пример):
 *    1 мл препарата ↑ NO₃ на 1.0 mg/L в 20 L воды
 *    ⇒  Δm = 1.0 mg/L × 20 L = 20 mg чистого NO₃  в 1 мл раствора
 *
 *  Формулы
 *  ----------------------------------------------------------------------
 *    ΔC       = target − measured               // mg/L
 *    mNitrate = ΔC × volume                      // mg чистого NO₃
 *    doseMl   = mNitrate / potency               // мл «AquaRus Нитрат+»
 **************************************************************************/

import { normal, volume } from './constants';

const potency = 70;

export function getAquarusNitratePlusDose(measured: number) {
    const deltaC = normal.no3 - measured; // mg/L

    if (deltaC <= 0) return 0; // повышение не требуется

    const requiredNitrate = deltaC * volume;
    const doseMl = requiredNitrate / potency;

    return +doseMl.toFixed(2); // округляем до сотых миллилитра
}

// /* ---------- Пример использования ---------- */
// const dose = getAquarusNitratePlusDose({
//     measured: 10, // текущий NO₃, mg/L
//     target: 25, // желаемый NO₃, mg/L
// });

// console.log(`Добавьте ${dose} мл «AquaRus Нитрат+»`);
// /*
//     Вывод (пример):
//     Добавьте 75.00 мл «AquaRus Нитрат+»
//   */
