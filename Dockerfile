# Use an official Ubuntu image as the base
FROM taskspire-base2 AS stage

EXPOSE 5173
EXPOSE 9323
EXPOSE 8080
CMD ["npm", "start"]
