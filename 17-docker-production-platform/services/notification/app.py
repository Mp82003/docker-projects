import pika

connection = pika.BlockingConnection(
    pika.ConnectionParameters("rabbitmq")
)

channel = connection.channel()

channel.queue_declare(
    queue="order-events",
    durable=True
)


def process_message(ch, method, properties, body):
    print("Received:", body, flush=True)

    # Message successfully processed
    ch.basic_ack(delivery_tag=method.delivery_tag)


channel.basic_consume(
    queue="order-events",
    on_message_callback=process_message,
    auto_ack=False
)

print("Waiting for messages...", flush=True)

channel.start_consuming()
