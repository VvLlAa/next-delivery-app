import { mockDeliveries, mockDeliveryDetails } from '@/utils/mockData';
import { DeliveryDetails } from '@/type/type';
import { formatDate } from '@/utils/formatData';
import styles from './Page.module.scss';
import { Context } from 'node:vm';

interface DeliveryCard {
  delivery: DeliveryDetails;
}

export const DeliveryDetailsPage = ({ delivery }: DeliveryCard) => {
  return (
    <div className={styles['page']}>
      <h2>Доставка №{delivery.entity.number}</h2>

      <div className={styles['page__status']}>
        <strong>Статус:</strong> {delivery.entity.statuses[0].name}
        {formatDate(delivery.entity.statuses[0].date_time)}
      </div>

      <div className={styles['page__section']}>
        <h3>Отправитель</h3>
        <p>
          <strong>Компания:</strong> {delivery.entity.sender.company}
        </p>
        <p>
          <strong>Имя:</strong> {delivery.entity.sender.name}
        </p>
        <p>
          <strong>Паспортные требования:</strong>
          {delivery.entity.sender.passport_requirements_satisfied
            ? 'Выполнены'
            : 'Не выполнены'}
        </p>
        <p>
          <strong>Адрес:</strong> {delivery.entity.from_location.address}
        </p>
        <p>
          <strong>Город:</strong> {delivery.entity.from_location.city}
        </p>
        <p>
          <strong>Регион:</strong> {delivery.entity.from_location.region}
        </p>
        <p>
          <strong>Страна:</strong> {delivery.entity.from_location.country}
        </p>
      </div>

      <div className={styles['page__section']}>
        <h3>Получатель</h3>
        <p>
          <strong>Компания:</strong> {delivery.entity.recipient.company}
        </p>
        <p>
          <strong>Имя:</strong> {delivery.entity.recipient.name}
        </p>
        <p>
          <strong>Телефон:</strong> {delivery.entity.recipient.phones[0].number}
        </p>
        <p>
          <strong>Паспортные требования:</strong>
          {delivery.entity.recipient.passport_requirements_satisfied
            ? 'Выполнены'
            : 'Не выполнены'}
        </p>
        <p>
          <strong>Адрес:</strong> {delivery.entity.to_location.address}
        </p>
        <p>
          <strong>Город:</strong> {delivery.entity.to_location.city}
        </p>
        <p>
          <strong>Регион:</strong> {delivery.entity.to_location.region}
        </p>
        <p>
          <strong>Страна:</strong> {delivery.entity.to_location.country}
        </p>
      </div>

      <div className={styles['page__section']}>
        <h3>Пакеты</h3>
        {delivery.entity.packages.map((item, index) => (
          <li key={index}>
            <p>
              <strong>Штрих-код:</strong> {item.barcode}{' '}
            </p>
            <p>
              <strong>Комментарий:</strong> {item.comment}
            </p>
            <p>
              <strong>Расчёт веса:</strong> {item.weight_calc}
            </p>
            <p>
              <strong>Вес\объём:</strong> {item.weight_volume}
            </p>
            <p>
              <strong>Ширина:</strong> {item.width}
            </p>
            <p>
              <strong>Высота:</strong> {item.height}
            </p>
          </li>
        ))}
      </div>

      <div className={styles['page__section']}>
        <h3>Стоимость доставки</h3>
        <p>
          <strong>Стоимость:</strong>{' '}
          {delivery.entity.delivery_detail.delivery_sum} руб.
        </p>
        <p>
          <strong>НДС:</strong>{' '}
          {delivery.entity.delivery_detail.delivery_vat_sum} руб.
        </p>
        <p>
          <strong>Итоговая сумма:</strong>{' '}
          {delivery.entity.delivery_detail.total_sum} руб.
        </p>
      </div>

      <div className={styles['page__section']}>
        <h3>Услуги</h3>
        <ul>
          {delivery.entity.services.map((service, index) => (
            <li key={index}>
              <p>
                <strong>Услуга:</strong> {service.code}
              </p>
              <p>
                <strong>Стоимость:</strong> {service.total_sum} руб.
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DeliveryDetailsPage;

export const getStaticProps = async (context: Context) => {
  const id = context.params?.id as string;
  try {
    // В реальном приложении:
    // const response = await axios.get('/api/cardDelivery.......');
    // store.dispatch(.......(delivery));
    // Моковые данные
    const deliveryDetails = mockDeliveryDetails(id as string);
    return {
      props: { delivery: deliveryDetails },
    };
  } catch (error) {
    return { error: error };
  }
};

export const getStaticPaths = async () => {
  const paths = mockDeliveries.map((delivery) => ({
    params: { id: delivery.id },
  }));

  return {
    paths,
    fallback: false,
  };
};
