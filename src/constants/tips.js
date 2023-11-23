const PHOTO_TIP = (
    <>
        <p className="tip-paragraph">
            На фотографии должно быть видно ваше лицо.
        </p>
        <br />
        <p className="tip-paragraph">Примеры неудачных изображений:</p>
        <p className="tip-paragraph">
            в тёмных очках, зернистые и размытые фотографии,
        </p>
        <p className="tip-paragraph">
            в шляпе, скрывающей часть лица, художественные варианты.
        </p>
        <br />
        <p className="tip-paragraph">
            Если у вас нет подходящего фото, лучше не добавлять его в резюме.
        </p>
    </>
)

const ACTUAL_STATUS_TIP = (
    <>
        <p className="tip-paragraph">
            Важно понимать, что статус — это ваши намерения и они могут быть
            разные. Если вы выставили статус, необходимо обновлять его каждые 2
            недели. Даже когда ничего не изменилось и он звучит также.
        </p>
        <br />
        <p className="tip-paragraph">
            В ином случае он будет автоматически изменён на «Не ищу работу».
        </p>
    </>
)

const CAREER_OBJECTIVE_TIP = (
    <>
        <p className="tip-paragraph">
            Важно описать желаемую должность именно так, как её будет искать
            рекрутер. Для этого полезно почитать описания похожих вакансий.
        </p>
        <br />
        <p className="tip-paragraph">
            Если должность в вашем резюме не смежная или вообще далека от
            выбранной вакансии, рекрутер, скорее всего, оценит резюме как не
            соответствующее требованиям или примет за ошибочный отклик.
        </p>
    </>
)

const EMAIL_TIP = (
    <p className="tip-paragraph">
        Указывайте только официальный адрес, никаких kolbasa19.
    </p>
)

const OTHER__SITE_LINK_TIP = (
    <p className="tip-paragraph">
        Можете добавить любую ссылку, которую не указывали выше. Например,
        личный сайт с портфолио.
    </p>
)

const JOB_TIP = (
    <p className="tip-paragraph">
        Пишите должность исходя из реальных задач, а не формально написанную в
        трудовой книжке
    </p>
)

export {
    PHOTO_TIP,
    ACTUAL_STATUS_TIP,
    CAREER_OBJECTIVE_TIP,
    EMAIL_TIP,
    OTHER__SITE_LINK_TIP,
    JOB_TIP,
}
