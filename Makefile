dbup:
	docker compose --profile db -f docker-compose.dev.yml up -d 

dbdown:
	docker compose --profile db -f docker-compose.dev.yml down

dbvdown:
	docker compose --profile db -f docker-compose.dev.yml down -v

allup:
	docker compose --profile all -f docker-compose.dev.yml up -d

alldown:
	docker compose --profile all -f docker-compose.dev.yml down

allvdown:
	docker compose --profile all -f docker-compose.dev.yml down -v